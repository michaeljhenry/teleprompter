
var speechController = (function() {

    return {
        speech_info: function(input) {
            var num_of_words = input.split(' ').length;
            input = input.replace(/^\s+|\s+$/g,''); // get rid of leading/trailing white spaces
            
            if(input == '') { // If the user doesnt enter any text
                input = 'Maybe enter some text next time...';
                var transition_duration = 5 + 's'
            }
            else { // Determine the speed of the teleprompter based on how many words were entered in the speech.
                if(num_of_words < 20) {
                    var transition_duration = 10 + 's'
                }
                if(num_of_words >= 20 && num_of_words < 40) {
                    var transition_duration = 20 + 's';
                }
                if(num_of_words >=40 && num_of_words < 60) {
                    var transition_duration = 30 + 's'
                }
                if(num_of_words >=60 && num_of_words < 80) {
                    var transition_duration = 40 + 's'
                }
                if(num_of_words >=80 && num_of_words < 100) {
                    var transition_duration = 50 + 's';
                }
                if(num_of_words >= 100) {
                    var transition_duration = (num_of_words/100) * 50 + 's'; // scale the transition speed based on how long the speech is.
                } 
                
            }
            return [input, transition_duration]
        }
    }
})();

var UIController = (function() {
    return {
        remove_input_screen: function() {
            document.getElementById("text_box").value = "";
            document.querySelector('#myForm').style.display = 'none';
            document.querySelector('#submit_btn').style.display = 'none';
            document.querySelector('.instructions').style.display = 'none';
        },
        create_speech_div: function(input) {
            var div  = document.createElement('div');
            div.className = 'speech';
            div.textContent = input;
            div.style.top = 300 + 'px';
            document.body.appendChild(div);

            return div;
        },
        teleprompter_setup: function(div, speed) {
            document.body.style.background = 'black';
            var y = document.querySelector('.speech').clientHeight;
            
            document.querySelector('.speech').style.position = 'absolute';
    
            div.style['transition-duration'] = speed;
    
            document.querySelector('.speech').style.top = '-' + (y + 300) + 'px';
    
        },
        speech_input_screen: function(div) {
            div.parentNode.removeChild(div);
            document.querySelector('#myForm').style.display = 'flex';
            document.querySelector('#submit_btn').style.display = 'flex';
            document.querySelector('.instructions').style.display = 'flex';
            document.body.style.background = 'white';
        }
    }
})();


var controller = (function(speechCtrl, UICtrl) {
    document.querySelector('#submit_btn').addEventListener('click', function() {
        var text = document.querySelector('#text_box').value;
        // get the scroll speed
        var info_array = speechCtrl.speech_info(text);
        
        text = info_array[0];
        var scroll_speed = info_array[1];

        // remove elements from the original screen
        UICtrl.remove_input_screen();

        // create the new div with the speech text
        var speech_div = UICtrl.create_speech_div(text);

        // change&add css properties for teleprompter screen
        UICtrl.teleprompter_setup(speech_div, scroll_speed);
        
        
        document.querySelector('#teleprompter_button').addEventListener('click', function() {
            UICtrl.speech_input_screen(speech_div);
        });

    })
})(speechController, UIController);