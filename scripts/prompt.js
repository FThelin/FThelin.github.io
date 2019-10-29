//COMMAND PROMPT ACTIONS
$('form button').click(() => {
        
    let commandEntered = $('form input').val().toLowerCase();        
            
    switch (inRoom){
        case 'hallway':
            switch (commandEntered){
                case 'enter mansion':                     
                    hallway.completion = 15;
                    $('.room-completion').css('visibility', 'visible');
                    updateCompletion('Hallway', hallway.completion);
                    changeImage('img/hallway.jpg');                       
                    stageTwoWriteText();
                    clearCommandPrompt();                        
                    break;
                case 'search hallway':
                    hallway.roomState = 1;
                    hallway.completion = 30;
                    updateCompletion('Hallway', hallway.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();                        
                    break;
                case 'search other room':
                    hallway.roomState = 2;
                    stageTwoWriteText();
                    clearCommandPrompt();                        
                    break;
                case 'add to inventory':
                    hallway.roomState = 3;
                    hallway.completion = 60;
                    updateCompletion('Hallway', hallway.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    $(inventory.slots[0]).html('<img src="img/inventory/paper.jpg">');
                    $(inventory.slots[1]).html('<img src="img/inventory/lipstick.jpg">');
                    $(inventory.slots[2]).html('<img src="img/inventory/bell.jpg">');                        
                    break;
                case 'examine bell':
                    hallway.roomState = 4;
                    hallway.completion = 75;
                    updateCompletion('Hallway', hallway.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    changeImage('img/maidinhall.jpg');  
                    break;
                case 'examine lipstick':
                    hallway.roomState = 5;
                    stageTwoWriteText();
                    clearCommandPrompt();
                    break;
                case 'examine paper':
                    hallway.roomState = 6;
                    stageTwoWriteText();
                    clearCommandPrompt();
                    break;
                case 'ask for map':
                    hallway.roomState = 7;
                    hallway.completion = 90;
                    updateCompletion('Hallway', hallway.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    break;
                case 'interrogate her':
                    hallway.roomState = 8;
                    stageTwoWriteText();
                    clearCommandPrompt();
                    break;
                default:
                    wrongCommand();
                    break;                    
            }            
            break;     
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
                default:
                    wrongCommand();
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
                case 'add both to inventory':
                    kitchen.roomState = 4;
                    kitchen.completion = 100;
                    updateCompletion("Kitchen", kitchen.completion)
                    stageTwoWriteText();
                    clearCommandPrompt();
                    $(inventory.slots[7]).html('<img src="img/inventory/liqnitro.jpg">');
                    $(inventory.slots[8]).html('<img src="img/inventory/key.jpg">');
                    break;
                default:
                    wrongCommand();
                    break;
            }
            break;
        case 'bedroom':
            switch (commandEntered) {
                case 'search bedroom':
                    bedroom.roomState = 1;
                    bedroom.completion = 33;
                    updateCompletion('Bedroom', bedroom.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    changeImage('img/bedroomcode.jpg');
                    break;
                case 'green pink yellow orange':
                    bedroom.roomState = 2;
                    bedroom.completion = 66;
                    updateCompletion('Bedroom', bedroom.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    changeImage('img/bedroom.jpg');
                    break;
                case 'add to inventory':
                    bedroom.roomState = 3;
                    bedroom.completion = 100;
                    updateCompletion('Bedroom', bedroom.completion);
                    stageTwoWriteText();
                    clearCommandPrompt();
                    $(inventory.slots[5]).html('<img src="img/inventory/letter.jpg">');
                    $(inventory.slots[6]).html('<img src="img/inventory/rustykey.jpg">');
                    break;
                default:
                    wrongCommand();
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
                default:
                    wrongCommand();
                    break;
            }
            break;
    }
})