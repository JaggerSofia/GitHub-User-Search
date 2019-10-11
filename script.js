
function watchForm(array) {
    $('form').submit(event => {
        event.preventDefault();
        let searchUser = $('#username').val();

        let url = `https://api.github.com/users/${searchUser}/repos`
        console.log(url);

        if (searchUser == ''){
            alert(`Please insert a username`);
        } else {
            fetch(url).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => displayResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`There is no one using that Username: ${err.message}`);
            })
        }   
    })
}

function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i in responseJson){
        let repo = responseJson[i];
        let output = `<a href='${repo.html_url} target='_blank'>${repo.name}</a><br></br>`;
        $('#results-list').append(output);
    }
    $('.hidden').removeClass('hidden');
}

$(watchForm)