const axios = require('axios');
const FormData = require('form-data'); // standard package, or we can use native FormData in newer node, or form-data
const fs = require('fs');
const path = require('path');

async function test() {
  try {
    // Create a dummy file for the resume
    const resumePath = path.join(__dirname, 'dummy_resume.pdf');
    fs.writeFileSync(resumePath, 'dummy PDF content for testing');

    const form = new FormData();
    form.append('name', 'Test Candidate');
    form.append('email', 'test@example.com');
    form.append('phone', '1234567890');
    form.append('linkedin', 'https://linkedin.com/in/test-candidate');
    form.append('position', 'Business Development Manager');
    form.append('yearsExperience', '3');
    form.append('skills', 'SQL, Python');
    form.append('message', 'This is a test candidate cover letter message of at least ten characters.');
    form.append('locale', 'en');
    form.append('resume', fs.createReadStream(resumePath), {
      filename: 'dummy_resume.pdf',
      contentType: 'application/pdf',
    });

    console.log('Sending request to http://localhost:3000/api/careers ...');
    const response = await axios.post('http://localhost:3000/api/careers', form, {
      headers: form.getHeaders(),
    });
    console.log('Success! Response data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

test();
