window.addEventListener('load',() => {
	registerSW();
})

//register and background sync of finding a book
async function registerSW(){
if(navigator.serviceWorker) {
        navigator.serviceWorker.register('./serviceworker.js')
        .then(function() {
            return navigator.serviceWorker.ready
        })
        .then(function(registration) {
            document.getElementById('findbook').addEventListener('click', (event) => {
                if(registration.sync) {
                    registration.sync.register('findbook-sync')
                    .catch(function(err) {
                        return err;
                    })
                }
            })
        })
    }
}
