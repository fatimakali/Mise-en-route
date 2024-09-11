const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', function() {
    const nameInput = document.getElementById('register-name');
    const mailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    
    var name = nameInput.value; 
    var mail = mailInput.value;
    var password = passwordInput.value;
    
    nameInput.value = '';
    mailInput.value = '';
    passwordInput.value = '';
    try {
         // tu mettera le fetch pour notre ip je l'ai pas  
         const response = fetch(``, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ name, mail, password })
        });
        if(!response.token) {
          console.log(`Erreur lors de la requete d'inscription`);
        }
        document.getElementById('responseDiv').innerHTML = result.message;
    
        const result = response.json();
        
        document.cookie = `UserToken=${encodeURIComponent(result.token)}; max-age=${(7 * 24 * 60 * 60)}`;
        window.location.href = 'index.html';
        console.log("inscription réussie");
    
      } catch(err) {
        console.log(`Erreur lors de l'inscription\nErreur:\n`, err);
      }
    })
    
    loginButton.addEventListener('click', function() {
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      
      var email = emailInput.value;
      var password = passwordInput.value;
      
      emailInput.value = '';
      passwordInput.value = '';
      
      try {
    // tu mettera le fetch pour notre ip je l'ai pas    
     const response = fetch(``, {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        if(response.ok) {
          
          const result = response.json();
          
          if(result.token) {
            document.cookie = `UserToken=${encodeURIComponent(result.token)}; max-age=${(7 * 24 * 60 * 60)}`;
            window.location.href = 'index.html';
          } else {
            document.getElementById('responseDiv').innerHTML = result.message;
          }
        }
      } catch(err) {
        console.log(`Erreur lors de l'envoi de la requête de connexion !\nErreur :\n`, err);
      }
    })  

  
    <script>
        const loginButton = document.getElementById('loginButton');
        const registerButton = document.getElementById('registerButton');
        
        registerButton.addEventListener('click', function() {
            const nameInput = document.getElementById('register-name');
            const mailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            
            var name = nameInput.value; 
            var mail = mailInput.value;
            var password = passwordInput.value;
            
            nameInput.value = '';
            mailInput.value = '';
            passwordInput.value = '';
            
            try {
                // tu mettera le fetch pour notre ip je l'ai pas
                const response = fetch(``, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ name, mail, password })
                });
                if(!response.token) {
                    console.log(`Erreur lors de la requete d'inscription`);
                }
                
                document.getElementById('responseDiv').innerHTML = response.message;
                
                document.cookie = `UserToken=${encodeURIComponent(response.token)}; max-age=${(7 * 24 * 60 * 60)}`;
                window.location.href = '';
                console.log("inscription réussie");
                
            } catch(err) {
                console.log(`Erreur lors de l'inscription\nErreur:\n`, err);
            }
        })
        
        loginButton.addEventListener('click', function() {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            
            var email = emailInput.value;
            var password = passwordInput.value;
            
            emailInput.value = '';
            passwordInput.value = '';
            
            try {
                // tu mettera le fetch pour notre ip je l'ai pas
                const response = fetch(``, {
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                if(!response.token) {
                    console.log(`Erreur lors de la requete d'inscription`);
                }
                
                document.getElementById('responseDiv').innerHTML = response.message;
                
                document.cookie = `UserToken=${encodeURIComponent(response.token)}; max-age=${(7 * 24 * 60 * 60)}`;
                  // tu mettera le fetch pour notre ip je l'ai pas
                window.location.href = '';
                console.log("Connexion réussie");
        } catch(err) {
            console.log(`Erreur lors de l'envoi de la requête de connexion !\nErreur :\n`, err);
        }
    })
</script>