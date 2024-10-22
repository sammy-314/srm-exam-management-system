// User data for login
const users = {
    samyak: {
        password: '1234',
        profile: {
            name: 'Samyak Tripathi',
            rollNumber: 'RA2211003011095',
            email: 'samyak.tripathi@gmail.com',
            results: [
                { code: 'CSE101', subject: 'Data Structures', grade: 'O', status: 'Pass' },
                { code: 'CSE102', subject: 'Algorithms', grade: 'A+', status: 'Pass' },
                { code: 'CSE103', subject: 'Operating Systems', grade: 'B', status: 'Pass' },
                { code: 'CSE104', subject: 'Database Systems', grade: 'C', status: 'Fail' },
                { code: 'CSE105', subject: 'Computer Networks', grade: 'A', status: 'Pass' },
                { code: 'CSE106', subject: 'Software Engineering', grade: 'O', status: 'Pass' },
                { code: 'CSE107', subject: 'Web Development', grade: 'A+', status: 'Pass' }
            ]
        }
    },
    manavi: {
        password: '1234',
        profile: {
            name: 'Manavi Lahoti',
            rollNumber: 'RA2211003011081',
            email: 'manavi.lahoti@gmail.com',
            results: [
                { code: 'CSE101', subject: 'Data Structures', grade: 'B', status: 'Pass' },
                { code: 'CSE102', subject: 'Algorithms', grade: 'A', status: 'Pass' },
                { code: 'CSE103', subject: 'Operating Systems', grade: 'C', status: 'Fail' },
                { code: 'CSE104', subject: 'Database Systems', grade: 'A+', status: 'Pass' },
                { code: 'CSE105', subject: 'Computer Networks', grade: 'O', status: 'Pass' },
                { code: 'CSE106', subject: 'Software Engineering', grade: 'B', status: 'Pass' },
                { code: 'CSE107', subject: 'Web Development', grade: 'F', status: 'Fail' }
            ]
        }
    },
    ria: {
        password: '1234',
        profile: {
            name: 'Ria Wadhwa',
            rollNumber: 'RA2211003011163',
            email: 'ria.wadhwa@gmail.com',
            results: [
                { code: 'CSE101', subject: 'Data Structures', grade: 'A', status: 'Pass' },
                { code: 'CSE102', subject: 'Algorithms', grade: 'F', status: 'Fail' },
                { code: 'CSE103', subject: 'Operating Systems', grade: 'A+', status: 'Pass' },
                { code: 'CSE104', subject: 'Database Systems', grade: 'O', status: 'Pass' },
                { code: 'CSE105', subject: 'Computer Networks', grade: 'C', status: 'Fail' },
                { code: 'CSE106', subject: 'Software Engineering', grade: 'B', status: 'Pass' },
                { code: 'CSE107', subject: 'Web Development', grade: 'A', status: 'Pass' }
            ]
        }
    }
};

// Faculty login data
const faculty = {
    username: 'faculty',
    password: 'admin'
};

// Handle student login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        const profile = users[username].profile;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('studentMainPage').style.display = 'block';
        document.getElementById('studentName').innerText = `Name: ${profile.name}`;
        document.getElementById('rollNumber').innerText = profile.rollNumber;
        document.getElementById('studentEmail').innerText = profile.email;
        
        const resultsTable = document.querySelector('#Results table');
        resultsTable.innerHTML = `
            <tr>
                <th>Subject Code</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Status</th>
            </tr>
        `;
        profile.results.forEach(result => {
            resultsTable.innerHTML += `
                <tr>
                    <td>${result.code}</td>
                    <td>${result.subject}</td>
                    <td>${result.grade}</td>
                    <td>${result.status}</td>
                </tr>
            `;
        });
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid username or password';
    }
});

document.getElementById('studentLoginBtn').addEventListener('click', function() {
    document.getElementById('studentLogin').style.display = 'block';
    document.getElementById('facultyLogin').style.display = 'none';
    document.getElementById('errorMessage').innerText = '';
    document.getElementById('facultyErrorMessage').innerText = '';
});

document.getElementById('facultyLoginBtn').addEventListener('click', function() {
    document.getElementById('studentLogin').style.display = 'none';
    document.getElementById('facultyLogin').style.display = 'block';
    document.getElementById('errorMessage').innerText = '';
    document.getElementById('facultyErrorMessage').innerText = '';
});

// Handle faculty login
document.getElementById('facultyLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('facultyUsername').value.toLowerCase();
    const password = document.getElementById('facultyPassword').value;
    
    if (username === faculty.username && password === faculty.password) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('facultyMainPage').style.display = 'block';
        openTab(null, 'DataStructures');
        populateSubjectTables();
    } else {
        document.getElementById('facultyErrorMessage').innerText = 'Invalid faculty username or password';
    }
});

// Populate tables for all subjects
function populateSubjectTables() {
    const subjects = [
        'Data Structures',
        'Algorithms',
        'Operating Systems',
        'Database Systems',
        'Computer Networks',
        'Software Engineering',
        'Web Development'
    ];

    subjects.forEach(subject => {
        const table = document.querySelector(`#${subject} table`);
        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Status</th>
            </tr>
        `;
        Object.values(users).forEach(user => {
            user.profile.results.forEach(result => {
                if (result.subject.replace(/ /g, '') === subject.replace(/([A-Z])/g, ' $1').trim()) {
                    table.innerHTML += `
                        <tr>
                            <td>${user.profile.name}</td>
                            <td>${user.profile.rollNumber}</td>
                            <td>${user.profile.email}</td>
                            <td>${result.grade}</td>
                            <td>${result.status}</td>
                        </tr>
                    `;
                }
            });
        });
    });
}

// Logout function
function logout() {
    document.getElementById('studentMainPage').style.display = 'none';
    document.getElementById('facultyMainPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Open tab function
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    if (evt) {
        evt.currentTarget.className += ' active';
    }
}

// Generate and download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('SRM Exam Schedule', 10, 10);

    // AutoTable for table data
    doc.autoTable({ html: '#ExamSchedule table' });

    // Save the PDF
    doc.save('exam_schedule.pdf');
}
