$(document).ready(function(){

    //Global Variables
    let gameState = 0;
    let playerName;
    let inRoom;

    const hallway = {
        completion: 0,
    };

    const kitchen = {
        completion: 0,
        roomState: 0,
    };

    const livingRoom = {
        completion: 0,
        roomState: 0,
    };

    const bedroom = {
        completion: 0,
        roomState: 0,
    };

    const basement = {
        completion: 0,
        roomState: 0,
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

    //Check gameState (for testing)
    $(document).keypress( e => {
        if (e.which == 13) {
            console.log(gameState);
        }
    });

    //Tabba mellan suspects och inventory
    $('.inventory-tab').click(() => {
        $('.inventory').css('display', 'flex');
        $('.suspects').css('display', 'none');
    })

    $('.suspects-tab').click(() => {
        $('.suspects').css('display', 'flex');
        $('.inventory').css('display', 'none');
    })
    
    //Get inventory items to combo slots
    $(inventory.slots).click(e => {
        inventory.source = e.target.getAttribute('src');
        if (inventory.source != 'img/emptyslot.jpg') {
            for(let i = 0; i < inventory.comboSlots.length; i++){
                inventory.comboSource = inventory.comboSlots[i].getAttribute('src');
                if (inventory.comboSource === 'img/comboslot.jpg'){
                    inventory.comboSlots[i].setAttribute('src', inventory.source);
                    break;
                }
            }
        }       
    });

    //Remove items from combo slots
    $(inventory.comboSlots).click(e => {
        inventory.comboSource = e.target.getAttribute('src');
        if (inventory.comboSource != 'img/comboslot.jpg'){
            e.target.setAttribute('src', 'img/comboslot.jpg');
        }
    })

    //Combine items from the inventory
    $('.combo button').click(() => {
        let comboSource1 = inventory.comboSlots[0].getAttribute('src');
        let comboSource2 = inventory.comboSlots[1].getAttribute('src');
        if (gameState === 5 && comboSource1 === 'img/inventory/lipstick.jpg' && comboSource2 === 'img/inventory/paper.jpg' 
        || comboSource1 === 'img/inventory/paper.jpg' && comboSource2 === 'img/inventory/lipstick.jpg') {
            gameState = 6
            writeText('The maid: There you go. This is a map over the house. Use it to find your way to the other rooms.', '');
            $('.map-img').html('<img src="img/map.jpg" usemap="#room-map">');
            inventory.comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
            inventory.comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
        }
    })
    
    const updateCompletion = (room, completion) => {
        $('.room-completion div p').text(`${room}: ${completion}%`);
        $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${completion}%, rgba(0, 255, 255, 0) 0%)`);
    }

    //-----------------------------------------------------------------------------------------//

    //CONTINUE FROM START SCREEN
    $('.start-screen div p').click(() => {
        $('.start-screen').fadeOut("slow", () => {
            $('.start-screen').css('display', 'none');
            
            playerName = $('.start-screen div input').val();            
            writeText(`Officer: -Detective ${playerName}, thanks for getting here so fast. As you know, Mrs Smith has been murdered.
            She was stabbed in the chest with a kitchen knife. Other than the victim there were 5 other people in the house. I am considering them
            all as suspects. You should go inside.`, `/Enter Mansion`);
        })
    })


    //COMMAND PROMPT CONVERSATIONS 
    $('form button').click(() => {
        let commandEntered = $('form input').val().toLowerCase();        
        
        switch (gameState){

            //ENTER MANSION INTO THE HALLWAY  
            case 0:
                if (commandEntered === "enter mansion"){
                    writeText('You: Ok I´m inside. It´s cold and dark. I don´t want to stay here for any longer than I have to. Maybe I should start looking for clues right away.', '/Search hallway  /Search other room');
                    changeImage('img/hallway.jpg');
                    clearCommandPrompt();
                    gameState = 1; 
                } else {
                    wrongCommand();                
                }
            break;
            
            //SEARCH THE HALLWAY
            case 1:
                if (commandEntered === "search hallway"){
                    clearCommandPrompt();
                    writeText('You: Ok, so there is nothing of value in the hallway. All I found was an old piece of paper, a lipstick and a bell. How does that help me solving a murder?', '/Add to inventory  /Ignore items');
                    clearCommandPrompt();
                    gameState = 2; 
                } else if (commandEntered === "search other room"){
                    clearCommandPrompt();
                    writeText('Game: -Come on! It´s a big house. At this stage, you have no idea how to get to the other rooms.', '/Search hallway  /Search other room');
                } else {
                    wrongCommand();                
                }
            break;

            //CONVERSATION IN THE HALLWAY
            case 2:
                if (commandEntered === "add to inventory"){
                    writeText('You: Maybe I should get a closer look at these items.', '/Examine paper  /Examine lipstick  /Examine bell');
                    clearCommandPrompt();
                    $(inventory.slots[0]).html('<img src="img/inventory/paper.jpg">');
                    $(inventory.slots[1]).html('<img src="img/inventory/lipstick.jpg">');
                    $(inventory.slots[2]).html('<img src="img/inventory/bell.jpg">');
                    gameState = 3; 
                } else if (commandEntered === "ignore items"){
                    clearCommandPrompt();
                    writeText('Game: Really?? You´re a bad detective. Minus 5 to your score.', '/Add to inventory  /Ignore items');
                } else {
                    wrongCommand();                
                }
            break;

            //CALL FOR THE MAID
            case 3:
                if (commandEntered === "examine bell"){
                    writeText('Ding ding ding, ...oh someone is coming... I guess this bell is used to call on the maid.', '/Interrogate her  /Ask for map');
                    clearCommandPrompt();
                    changeImage('img/maidinhall.jpg');                   
                    gameState = 4; 
                } else if (commandEntered === "examine lipstick"){
                    clearCommandPrompt();
                    writeText('You: Just a normal lipstick. It has been used though.', '/Examine paper  /Examine lipstick  /Examine bell');
                } else if (commandEntered === "examine paper"){
                    clearCommandPrompt();
                    writeText('You: Looks just like an old piece of paper. Nothing special about it.', '/Examine paper  /Examine lipstick  /Examine bell');
                } else {
                    wrongCommand();                
                }
            break; 
            
            //TALK TO THE MAID
            case 4:
                if (commandEntered === "ask for map"){
                    writeText('The maid: I can draw you a map of the house. I need something to draw on and something to draw with', '');
                    clearCommandPrompt();                  
                    gameState = 5; 
                } else if (commandEntered === "interrogate her"){
                    clearCommandPrompt();
                    writeText('You: She admit Mrs Smith was not a very nice person and deserved what happened to her. But she denies any involvement in the murder. Claims she was sleeping at the time.', '/Interrogate her  /Ask for map');
                } else {
                    wrongCommand();                
                }
            break;
        }

        //PHASE 2 - Use roomState instead of gameState//
        switch (inRoom){
            case 'livingRoom':
                switch (commandEntered){
                    case 'search living room':
                        livingRoom.roomState = 1;
                        livingRoom.completion = 50;
                        updateCompletion('Living room', livingRoom.completion);
                        stageTwoWriteText();
                        clearCommandPrompt();                        
                        break;
                    case 'add to inventory':
                        livingRoom.roomState = 2;
                        livingRoom.completion = 75;
                        updateCompletion('Living room', livingRoom.completion);
                        stageTwoWriteText();
                        clearCommandPrompt();
                        $(inventory.slots[4]).html('<img src="img/inventory/hammer.jpg">');                        
                        break;
                }
                break;
            case 'kitchen':
                switch (commandEntered) {
                    case 'search kitchen':
                        kitchen.roomState = 1;
                        kitchen.completion = 25;
                        updateCompletion("Kitchen", kitchen.completion)
                        stageTwoWriteText();
                        clearCommandPrompt();
                        break;
                    case 'add to inventory':
                        kitchen.roomState = 2;
                        kitchen.completion = 50;
                        updateCompletion("Kitchen", kitchen.completion)
                        stageTwoWriteText();
                        clearCommandPrompt();
                        $(inventory.slots[3]).html('<img src="img/inventory/chefhat.jpg">');
                        break;
                }
                break;
            case 'bedroom':
                switch (commandEntered) {
                    case 'search bedroom':
                        bedroom.roomState = 1;
                        bedroom.completion = 25;
                        updateCompletion('Bedroom', bedroom.completion);
                        stageTwoWriteText();
                        clearCommandPrompt();
                        changeImage('img/bedroomcode.jpg');
                        break;
                    case 'green pink yellow orange':
                        bedroom.roomState = 2;
                        bedroom.completion = 50;
                        updateCompletion('Bedroom', bedroom.completion);
                        stageTwoWriteText();
                        clearCommandPrompt();
                        changeImage('img/bedroom.jpg');
                        break;
                }
                break;
            case 'basement':
                switch (commandEntered) {
                    case 'placeholder':
                        kitchen.roomState = 1;
                        stageTwoWriteText();
                        clearCommandPrompt();
                        break;
                }
                break;
        }
    })

    //STAGE 2 COMMAND PROMT//
    const stageTwoWriteText = () => {
        switch (inRoom){
            case 'livingRoom':
                switch (livingRoom.roomState){
                    case 0:
                        writeText('You: What the hell happened in here, looks like there´s been some kind of struggle. Maybe between the victim and the murderer?', '/Search living room');
                        break;
                    case 1:
                        writeText('You: Found a hammer. The victim was stabbed with a knife, but everything that can be used as a weapon is intresting to me.', '/Add to inventory');
                        break;
                    case 2:
                        writeText('You: Nothing to do here right now', '');
                }
                break;
            case 'kitchen':
                switch (kitchen.roomState){
                    case 0:
                        writeText('You: Kitchen looks neat and clean. I can definitley go for a snack.', '/Search kitchen');
                        break;
                    case 1:
                        writeText('You: Well, look at this! A chef´s hat, and there is some red stains on it. Blood? Also there is a drawer that can´t be opened.', '/Add to inventory');
                        break;
                    case 2:
                        writeText('You: I need something to open that kitchen drawer with...', '');
                        break;
                    case 3:
                        writeText('You: Sweet, the drawer contained a key. Also found this can of liquid nitrogen. May come in handy', '/Add both to inventory');
                        break;
                }
                break;
            case 'bedroom':
                switch (bedroom.roomState){
                    case 0:
                        writeText('You: This is the victim´s bedroom. She and her husband used seperate bedrooms.', '/Search bedroom');
                        break;
                    case 1:
                        writeText('You: The victim had a safety security box. But I need some kind of code to open it. I think I have to tell the correct order of the colors. There is blue, yellow, pink, orange and green.', 'color color color color');
                        break;
                    case 2:
                        writeText('You: Nailed it! Inside is a love letter from a secret admirer and a rusty key.', '/Add to inventory');
                }
                break;
            case 'basement':
                switch (basement.roomState){
                    case 0:
                        writeText('You: Hmm, the door is locked. I need a key to be able to open it.', '');
                        break;
                    case 1:
                        writeText('Källaren är låst', 'test');
                }
                break;    
        }   
    }

    //Go to rooms using map
    $('map area').click(e => {
        e.preventDefault();
        $('.room-completion').css('visibility', 'visible');
        hallway.completion = 100;
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
                changeImage('img/livingroom.jpg');
                updateCompletion('Living room', livingRoom.completion);
                stageTwoWriteText();
                break;
            case 'kitchen':
                inRoom = "kitchen";    
                changeImage('img/kitchen.jpg');
                updateCompletion('Kitchen', kitchen.completion);
                stageTwoWriteText();
                break;
            case 'bedroom':
                inRoom = "bedroom";
                changeImage('img/bedroom.jpg');
                updateCompletion('Bedroom', bedroom.completion);
                stageTwoWriteText();
                break;
            case 'basement':
                inRoom = "basement";
                changeImage('img/basementdoor.jpg');
                updateCompletion('Basement', basement.completion);
                stageTwoWriteText();
            break;
        }
    })
       
})
