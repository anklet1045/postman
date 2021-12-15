console.log('Welcome to postmaster website');
let paramsBox = document.getElementById('paramsBox');
paramsBox.style.display = 'none';

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('paramsBox').style.display = 'none';
    document.getElementById('requestJson').style.display = 'block';
})

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('paramsBox').style.display = 'block';
    document.getElementById('requestJson').style.display = 'none';
})

// if the user clicks on  + button add the more parameters

//  Initialize number of parameters
let addedParamsCount = 0;
// creating DOM element from the string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;

}
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', function () {
    let params = document.getElementById('params');
    let string = `<div class="row g-4 my-2 ">
                    <label for="inputPassword" class="col-sm-2 col-form-label ">Parameter ${addedParamsCount + 2}</label>

                    <div class="col-sm-4">
                        <input type="text" class="form-control"  id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key" aria-label="City">
                    </div>
                    <div class="col-sm-4 ">
                        <input type="text" class="form-control"  id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value" aria-label="State">
                    </div>
                    
                        <button class=" btn btn-primary btn-sm deleteParam" style="width:35px;" > - </button>
            
                </div>`;

    let paramsElement = getElementFromString(string);
    console.log(paramsElement);
    params.appendChild(paramsElement);

    // add an event listener to remove the parameter on clicking  - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (let item of deleteParam) {
        item.addEventListener('click', (e) => {

            let str = `<div class="alert alert-warning alert-dismissible fade show my-4" role="alert">
                            <h4 class="alert-heading">Warning!</h4>
                            <p> Do you really want to delete the parameters list .</p>
                            <hr>
                            <p class="mb-0"> You cannot access the parameters again.</p>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                     </div>`;
            document.getElementById('alerts').innerHTML = str;
            e.target.parentElement.remove();
            e.target.previousElementSibling.remove();
        })
    }
    addedParamsCount++;
})

// if the  user clicks on the submit button then
let submit = document.getElementById('submit');
submit.addEventListener('click', function () {
    document.getElementById('responsePrism').value = 'Please wait.. Fetching';

    // Fetch all the values user has entered
    let url = document.getElementById('url').value;

    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }

    // log all the values in the console for debugging
    console.log('url is ', url);
    console.log('request type is ', requestType);
    console.log('content type is ', contentType);
    console.log('data is ', data);


    // if the request type is post , invoke fetch api to create a post request
    if (requestType == 'get') {
        fetch(url, {
            method: 'GET',
        })

            .then(response => response.text())
            .then((text) => {

                document.getElementById('responsePrism').innerHTML = text;

            });
    }


    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })

            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
            }); 
    }

});
