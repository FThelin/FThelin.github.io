    //Get inventory items to combo slots   
    $(inventory.slots).click(e => {
        if (kitchen.roomState != 2){
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
        }
    })
    
    

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
        if (hallway.roomState === 7){
            if (comboSource1 === 'img/inventory/lipstick.jpg' && comboSource2 === 'img/inventory/paper.jpg' 
            || comboSource1 === 'img/inventory/paper.jpg' && comboSource2 === 'img/inventory/lipstick.jpg') {
                writeText('The maid: There you go. This is a map over the house. Use it to find your way to the other rooms.', '');
                $('.map-img').html('<img src="img/map.jpg" usemap="#room-map">');
                inventory.comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
                inventory.comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
                hallway.completion = 100;
                hallway.roomState = "Done";
                updateCompletion('Hallway', hallway.completion);
            }
        } 
        if (inRoom === 'basement' && kitchen.roomState === 4 && livingRoom.roomState >= 2){
            if (comboSource1 === 'img/inventory/hammer.jpg' && comboSource2 === 'img/inventory/liqnitro.jpg' 
            || comboSource1 === 'img/inventory/liqnitro.jpg' && comboSource2 === 'img/inventory/hammer.jpg') {
                writeText('You: I frooze the lock with the liquid nitrogen and smashed it to pieces with the hammer. The basement door is now open.', '');                
                inventory.comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
                inventory.comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
                basement.completion = 25;
                updateCompletion('Basement', basement.completion);
            }
        }               
    })

    $(inventory.slots[6]).click(() => {
        if (inRoom === 'kitchen' && bedroom.roomState === 3 && kitchen.roomState === 2){
            kitchen.roomState = 3;
            kitchen.completion = 75;
            updateCompletion("Kitchen", kitchen.completion)
            stageTwoWriteText();
        }
    })