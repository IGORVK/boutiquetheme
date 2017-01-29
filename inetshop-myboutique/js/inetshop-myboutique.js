$( document ).ready(function() {

    $('img').removeAttr('width').removeAttr('height').removeAttr('sizes').removeAttr('style');



/*    if($('.pagination-custom li:first-child span.current')){
        $('.pagination-custom li:first-child').before('<li class="disabledLeft"><span>←</span></li>');
        firstLi = 0;
    }*/

/*    if($('.pagination-custom li a.prev')) {
        $('.pagination-custom li.disabledLeft').remove();
        existPrev = 0;

    }*/


/*    if($('.pagination-custom li:last-child span.current')){
        $('.pagination-custom li:last-child').after('<li class="disabledRight"><span>→</span></li>');
        lastLi = 0;
    }*/
 /*   if($('.pagination-custom li a.next'))
    {
        $('.pagination-custom li.disabledRight').remove();
        existNext = 0;
    }
*/


});

//Loader

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");


}); 