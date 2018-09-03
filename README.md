# CUSTOM SCROLLBAR 

IN THIS SCROLLBAR , YOU WILL FIND FOUR TYPE OF SCENARIOS FOR SCROLLBAR, PLEASE CHECK BELOW EXAMPLE AND FOLLOW BASIC POINTS :-


# BASIC POINTS

NEED TO SET (max-height) ALWAYS IN CSS FOR MAIN CONTAINER



# EXAMPLES

# Example with horizontal and vertical scrollbar
$('.scrollbar1').scrollbar(); 


# Example with horizontal scrollbar only
$('.scrollbar2').scrollbar({ 
    verticalScrollbar:false
});


# Example with vertical scrollbar only
$('.scrollbar3').scrollbar({
    horizontalScrollbar:false
});


# Example with horizontal and vertical scrollbar when content is less then height or width (Means scrollbar will display like overflow:auto)
# (For best view please look into mobile oriantation change)
$('.scrollbar4').scrollbar();
