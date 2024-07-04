const links =  document.querySelectorAll('.blog-link-send-data');
  links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior

                const id = event.target.getAttribute('data-id');
                
                // Send the ID to the back-end
                fetch('/id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id })
                })
                .then(response => {
                    if (response.ok) {
                        // Redirect to the new page with the ID as a query parameter
                        window.location.href = `/blog`;
                    } else {
                        console.error('Failed to send ID');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });   
        
        document.getElementById('delete-blog').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            const id = event.currentTarget.getAttribute('data-id');
            
            // Send the ID to the back-end
            fetch('/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
            .then(response => {
                if (response.ok) {
                    // Redirect to the new page with the ID as a query parameter
                    window.location.href = `/delete-post`;
                } else {
                    console.error('Failed to send ID');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
