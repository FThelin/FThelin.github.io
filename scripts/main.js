$(document).ready(function(){

    //Global Variables
    let source, comboSource, playerName, hallwayDone;
    let livingroomDone = 0;
    let kitchenDone = 0;
    let bedroomDone = 0;
    let basementDone= 0;
    let gameState = 0;
    const inventory = $('table tr td');
    const comboSlots =$('.combo img');
        
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
    $(inventory).click(e => {
        source = e.target.getAttribute('src');
        if (source != 'img/emptyslot.jpg') {
            for(let i = 0; i < comboSlots.length; i++){
                comboSource = comboSlots[i].getAttribute('src');
                if (comboSource === 'img/comboslot.jpg'){
                    comboSlots[i].setAttribute('src', source);
                    break;
                }
            }
        }       
    });

    //Remove items from combo slots
    $(comboSlots).click(e => {
        comboSource = e.target.getAttribute('src');
        if (comboSource != 'img/comboslot.jpg'){
            e.target.setAttribute('src', 'img/comboslot.jpg');
        }
    })

    //Combine items from the inventory
    $('.combo button').click(() => {
        let comboSource1 = comboSlots[0].getAttribute('src');
        let comboSource2 = comboSlots[1].getAttribute('src');
        if (gameState === 5 && comboSource1 === 'img/inventory/lipstick.jpg' && comboSource2 === 'img/inventory/paper.jpg' 
        || comboSource1 === 'img/inventory/paper.jpg' && comboSource2 === 'img/inventory/lipstick.jpg') {
            gameState = 6
            writeText('The maid: There you go. This is a map over the house. Use it to find your way to the other rooms.', '');
            $('.map-img').html('<img src="img/map.jpg" usemap="#room-map">');
            comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
            comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
        }
    })

    //Go to rooms using map
    $('map area').click(e => {
        e.preventDefault();
        $('.room-completion').css('visibility', 'visible');
        hallwayDone = 23;
        let room = e.target.getAttribute('class');
        switch (room){
            case 'hallway':
                changeImage('img/hallway.jpg');
                $('.room-completion div p').text(`Hallway: ${hallwayDone}%`);
                $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${hallwayDone}%, rgba(0, 255, 255, 0) 0%)`);
                break;
            case 'living-room':
                changeImage('img/livingroom.jpg');
                $('.room-completion div p').text(`Living room: ${livingroomDone}%`);
                $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${livingroomDone}%, rgba(0, 255, 255, 0) 0%)`);
                break;
            case 'kitchen':
                changeImage('img/kitchen.jpg');
                $('.room-completion div p').text(`Kitchen: ${kitchenDone}%`);
                $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${kitchenDone}%, rgba(0, 255, 255, 0) 0%)`);
                break;
            case 'bedroom':
                changeImage('img/bedroom.jpg');
                $('.room-completion div p').text(`Bedroom: ${bedroomDone}%`);
                $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${bedroomDone}%, rgba(0, 255, 255, 0) 0%)`);
                break;
            case 'basement':
                changeImage('img/basement.jpg');
                $('.room-completion div p').text(`Basement: ${basementDone}%`);
                $('.room-completion div').css('background', `linear-gradient(to right,#204580 ${basementDone}%, rgba(0, 255, 255, 0) 0%)`);
            break;
        }
    })
    

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
                    $(inventory[0]).html('<img src="img/inventory/paper.jpg">');
                    $(inventory[1]).html('<img src="img/inventory/lipstick.jpg">');
                    $(inventory[2]).html('<img src="img/inventory/bell.jpg">');
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
    })

       
})
