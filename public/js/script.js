$(document).ready(function() {
    $.ajax({
        url: '/api/stuff',
        method: 'GET',
        success: function(response) {
            const stuff = response;

            // Parcours des objets et création des éléments HTML correspondants
            stuff.forEach(item => {
                const listItem = $('<li>').html(`<img src="${item.imageUrl}"></img><strong>${item.title}</strong>: ${item.description}, Price: ${item.price}`);
                
                // Ajout de l'élément à la liste
                $('#stuffList').append(listItem);
            });
        },
        error: function(error) {
           console.error(error);
        }
    });
});