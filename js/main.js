let slideIndex = 1;

// 'preferencesObject' - global variable to hold the preferencesObject object
// Which will either be created a new empty object initially or
// from a JSON encoded string retreived from local storage if
// user settings/preferencesObject have already been saved there (as a JSON encoded string)
let preferencesObject;

// audio start / stop
function startAudio(sound) {
    sound.play();
}

function stopAudio(sound) {
    sound.pause();
}

// window.onload (event) will be raised each time
// a page loads. (The same as the body tag onload event)
window.onload = function(){

    // If local storage is undefined it is not available
    if(typeof(Storage) === undefined){
        console.log("Local storage is not available");
    }
    else
    {
        // Check if User Name is set in local storage
        checkName();

        // get the location of the window
        let url = window.location.pathname;

        // if is index.html show the slider
        if (( url.substring(url.lastIndexOf('/')+1)) === 'index.html'){
            showSlides(slideIndex);
        }
        // if is types.html add listener to gallery images
        if (( url.substring(url.lastIndexOf('/')+1)) === 'types.html'){
            var classname = document.getElementsByClassName("gallery-img");
            Array.from(classname).forEach(function(element) {
                element.addEventListener('mouseover', spinImage);
                element.addEventListener('mouseout', spinImageBack);
            });
        }
        // if is culture.html init sound element
        if (( url.substring(url.lastIndexOf('/')+1)) === 'culture.html'){
        }

        if(localStorage.getItem("usersettings") ===  null ){
            // so initialise the global preferencesObject to a an empty Object
            preferencesObject = {};
        }
        // If 'usersettings' is not null then it exists and we will have settings
        else{
            // Retrieve the JSON encoded string for the key
            // 'usersettings' and parse/convert it to an object

            let usersettings = localStorage.getItem("usersettings");
            preferencesObject =  JSON.parse(usersettings);

            // *******************************************************************
            // SET THE VALUE OF THE PREFERNCES INPUTS TO REFLECT CURRENT SETTINGS/PREFERNECEs

            // Check to see if the page name from the pathname
            // is 'preferences.html'
            if(( url.substring(url.lastIndexOf('/')+1)) === 'preferences.html'){
                document.getElementById('prefName').value = preferencesObject.prefName;
                document.getElementById('paracolor').value = preferencesObject.paracolor;
                document.getElementById('bgcolor').value = preferencesObject.bodycolor;
                document.getElementById('parafontsize').value = preferencesObject.parafontsize;
                document.getElementById('fontsize-display').innerHTML = preferencesObject.parafontsize + 'px';
            }
            // *******************************************************************
            // *******************************************************************

            // If we have a paragraph color then set that as the paragraph color
            // check and set if the object has a porperty called
            // 'paracolor. the string 'undefined' would be retunred
            // if it does not exist in the object

            // get all the ptags
            let ptags = document.getElementsByTagName("p");

            if(preferencesObject.paracolor !== undefined ){
                // set their color
                for (let index = 0; index < ptags.length; index++) {
                    ptags[index].style.color = preferencesObject.paracolor;
                }
            }
            // If we have a font size color then set that as the paragraph font size color
            if(preferencesObject.parafontsize !== undefined){
                for (let index = 0; index < ptags.length; index++) {
                    ptags[index].style.fontSize = preferencesObject.parafontsize + "px";
                }
            }
            // If we have a background color then set that as the background color
            if(preferencesObject.bodycolor !== undefined){
                document.body.style.backgroundColor = preferencesObject.bodycolor;
                setBgColor(preferencesObject.bodycolor);
            }
        }
    }

}; // end of onload


function setParaColor(){
    // get all the p tags
    let ptags =  document.getElementsByTagName("p");

    let paracolor = document.getElementById("paracolor").value;

    // Create a property in the preferencesObject object for paragraph
    // color and save the selected color to it.
    preferencesObject.paracolor = paracolor;

    // set all paragraphs color
    for (let index = 0; index < ptags.length; index++) {
        ptags[index].style.color = paracolor;
    }

    // set changed made to true
    changesMade = true;
    // Just for testing purposes
    showLocalStorage();
}

function setBgColor(setcolor){
    // get all the body tag
    let main =  document.getElementsByTagName("main");
    let header =  document.getElementsByTagName("header");
    var footer =  document.getElementsByTagName("footer");

    if (setcolor !== undefined){
        var maincolor = setcolor;
    } else {
        var maincolor = document.getElementById("bgcolor").value;
    }

    // Create a property in the preferencesObject object for body
    // color and save the selected color to it.
    preferencesObject.bodycolor = maincolor;

    document.body.style.background = maincolor;
    main[0].style.background = maincolor;
    header[0].style.background = maincolor;
    footer[0].style.background = maincolor;

    // set changed made to true
    changesMade = true;
}

function setFontSize(){
    // get the font from the combo box
    let parafontsize = document.getElementById("parafontsize").value;

    // collection of p tags
    let ptags = document.getElementsByTagName("p");

    for (let index = 0; index < ptags.length; index++) {
        ptags[index].style.fontSize = parafontsize + "px";
    }
    preferencesObject.parafontsize = parafontsize;

    document.getElementById('fontsize-display').innerHTML = parafontsize + 'px';

    // set changed made to true
    changesMade = true;
}

function savepreferencesObject(){
    preferencesObject.prefName = document.getElementById('prefName').value;

    // JSON encode our preferencesObject object
    let settings = JSON.stringify(preferencesObject);

    // Feedback to confirm to user
    if (confirm("Are you sure you want to update the settings?")){
        // save the JSON encoded settings string to local storage
        // with the key of "usersettings"
        localStorage.setItem("usersettings",settings);

        // set the boolean to true to indicate changes have been saved
        changesSaved = true;
        resetUnsavedChangesWarning();
    }
    location.reload();

}

function showLocalStorage(){
    // Dump the local storage to the console for testing
    console.log(localStorage);
}


// Clear local storage
function reset(){
    // Clear local storage
    localStorage.clear();

    // Reset the elements styling we have changed with javascript
    // (Setting them to to empty strings in the DOM with Javascript
    // will magically make them go back to defaults)
    document.body.style.backgroundColor = "";
    let ptags = document.getElementsByTagName("p");
    for (let index = 0; index < ptags.length; index++) {
        ptags[index].style.color= "";
        ptags[index].style.fontSize = "";
    }

    // *******************************************************************
    // SET THE VALUE OF THE PREFERNCES INPUTS  BACK TO DEFAULT's
    document.getElementById('paracolor').value = '#ffffff';
    document.getElementById('bgcolor').value =  '#000000';
    document.getElementById('parafontsize').value =  '18';
    document.getElementById('fontsize-display').innerHTML = '18px';
    location.reload();
}

function resetUnsavedChangesWarning(){
    // Reset the warning message
    document.getElementById("message").innerHTML = "";
}


function checkName(){
    let usersettings = localStorage.getItem("usersettings");
    if (usersettings !== null){
        let preferencesObject =  JSON.parse(usersettings);
        if (preferencesObject.prefName !== undefined) {
            let message = "Welcome " + preferencesObject.prefName + "!";
            document.getElementById("welcome-message").style.display = 'block';
            document.getElementById("welcome-message").innerText = message;
        } else {
            //prompt returns a string
            let prefName = prompt("Please enter your name ");
            if (prefName !== null){
                let message = "Welcome " + prefName + "!";
                preferencesObject.prefName = prefName;
                document.getElementById("welcome-message").innerText = message;
                document.getElementById("welcome-message").style.display = 'block';
            }
        }
    } else {
        //prompt returns a string
        let prefName = prompt("Please enter your name ");
        if (prefName !== null){
            let message = "Welcome " + prefName + "!";
            preferencesObject = {};
            preferencesObject.prefName = prefName;
            document.getElementById("welcome-message").innerText = message;
            document.getElementById("welcome-message").style.display = 'block';
        }
    }
    if (preferencesObject !== undefined){
        let settings = JSON.stringify(preferencesObject);
        localStorage.setItem("usersettings",settings);
        location.reload();
    }

}

// Index.html Slider functions
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// types gallery interactive
function spinImage(){
    this.style.animation = 'fa-spin 1s infinite linear';
}

function spinImageBack(){
    this.style.animation = 'fa-spin 0s none linear';
}

//use the HtML Geolocation API
function getPosition() {
    var lat = document.getElementById("lat");
    var long = document.getElementById("long");

    // navigator is the browser
    //check to see if geolocation is supported/available
    if (navigator.geolocation) {
        console.log("Geolocation is supported");
        navigator.geolocation.getCurrentPosition(setPosition);
    }
    else {

        lat.innerHTML += "Your browser does not support Geolocation";
        long.innerHTML += "Your browser does not support Geolocation";

    }
}
//a function to set/show the latitude and longitude of or position
function setPosition(position) {
    lat.innerHTML += position.coords.latitude;
    long.innerHTML += position.coords.longitude;
}