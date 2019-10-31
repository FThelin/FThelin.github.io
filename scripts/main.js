    //Global Variables
    let playerName;
    let inRoom = 'hallway';

    const hallway = {
        completion: 0,
        roomState: 0
    };

    const kitchen = {
        completion: 0,
        roomState: 0
    };

    const livingRoom = {
        completion: 0,
        roomState: 0
    };

    const bedroom = {
        completion: 0,
        roomState: 0
    };

    const basement = {
        completion: 0,
        roomState: 0
    }

    const inventory = {
        slots: $('table tr td'),
        comboSlots: $('.combo img'),
        source: '',
        comboSource: ''
    }
        
    //Write text to the text area and show commands
    const writeText = (message, commands) => {
        $('.text-area div').text(message);
        $('.commands').text(commands);
    }

    //Write error message when using a non valid command
    const wrongCommand = () => {
        $('.text-area div').text('Game: -Sorry, I don´t understand that. Try Again');
    }

    //Clear command prompt
    const clearCommandPrompt = () => {
        $('form input').val('');
    }

    //Change room image
    const changeImage = url => {
        $('.rooms img').attr('src' ,url);
    } 

    //Switch between suspects and inventory view
    $('.inventory-tab').click(() => {
        $('.inventory').css('display', 'flex');
        $('.suspects').css('display', 'none');
    })

    $('.suspects-tab').click(() => {
        $('.suspects').css('display', 'flex');
        $('.inventory').css('display', 'none');
    }) 
    
    const updateCompletion = (room, completion) => {
        $('.room-completion div p').text(`${room}: ${completion}%`);
        $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${completion}%, rgba(0, 255, 255, 0) 0%)`);
    } 

    //Continue from start screen
    $('.start-screen div p').click(() => {
        $('.start-screen').fadeOut("slow", () => {
            $('.start-screen').css('display', 'none');
            
            playerName = $('.start-screen div input').val();            
            writeText(`Officer: -Detective ${playerName}, thanks for getting here so fast. As you know, Mrs Smith has been murdered.
            She was stabbed in the chest with a kitchen knife. Other than the victim there were 5 other people in the house. I am considering them
            all as suspects. You should go inside.`, `/Enter Mansion`);
        })
    })      

    //Go to rooms using map
    $('map area').click(e => {
        e.preventDefault();        
        let room = e.target.getAttribute('class');
        switch (room){
            case 'hallway':                
                inRoom = 'hallway';
                changeImage('img/hallway.jpg');
                updateCompletion('Hallway', hallway.completion);
                writeText('You: All done in here!', '');                
                break;
            case 'living-room':
                inRoom = "livingRoom";
                if (bedroom.roomState === 3 && kitchen.roomState === 4 && livingRoom.roomState === 2){
                    changeImage('img/livingroomblood.jpg');
                    livingRoom.roomState = 3;
                    livingRoom.completion = 100;
                    updateCompletion('Living room', livingRoom.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                } else if (livingRoom.roomState === 4 || livingRoom.roomState === 3) {
                    changeImage('img/livingroomblood.jpg');
                    updateCompletion('Living room', livingRoom.completion);
                    stageTwoWriteText();
                } else {                    
                    changeImage('img/livingroombody.jpg');
                    updateCompletion('Living room', livingRoom.completion);
                    stageTwoWriteText();
                }                
                break;
            case 'kitchen':
                inRoom = "kitchen";    
                changeImage('img/kitchen.jpg');
                updateCompletion('Kitchen', kitchen.completion);
                stageTwoWriteText();                    
                break;
            case 'bedroom':
                inRoom = "bedroom";                
                updateCompletion('Bedroom', bedroom.completion);
                stageTwoWriteText();
                if (bedroom.roomState === 1) {
                    changeImage('img/bedroomcode.jpg');
                } else {
                    changeImage('img/bedroom.jpg');
                }
                break;
            case 'basement':
                inRoom = "basement";
                updateCompletion('Basement', basement.completion);
                stageTwoWriteText();
                if (basement.roomState <= 0){
                    changeImage('img/basementdoor.jpg');                    
                } else if (basement.roomState <= 2){
                    changeImage('img/basement.jpg'); 
                } else if (basement.roomState <= 4){
                    changeImage('img/basementwires.jpg');
                } else if (basement.roomState >= 5){
                    changeImage('img/basementsafe.jpg');
                }                               
            break;
        }
    })