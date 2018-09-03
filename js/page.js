$(document).ready(function(){

    $('.scrollbar1').scrollbar(); // Example with horizontal and vertical scrollbar

    $('.scrollbar2').scrollbar({ // Example with horizontal scrollbar only
        verticalScrollbar:false
    });

    $('.scrollbar3').scrollbar({ // Example with vertical scrollbar only
        horizontalScrollbar:false
    });

    $('.scrollbar4').scrollbar(); // Example with horizontal and vertical scrollbar when content is less then height or width (Means scrollbar will display like overflow:auto)(For best view please look into mobile oriantation change)

})