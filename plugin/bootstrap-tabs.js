(function($) {  
				$.fn.tabs = function(options) { 
						debug(this);  
						$this = $(this);
						var defaults = {  
							tab_titles:{'tab1':'tab11','tab2':'tab22','tab3':'tab33'},
							active_position:1
						};
						var options = $.extend(defaults, options);  
						
						return this.each(function() { 
							var _tabs = $.fn.tabs.createTab($(this),options.tabs_num,options.tab_titles); 
							$.fn.tabs.active(_tabs,options.active_position);
							$.fn.tabs.bindEvents(_tabs);
						});
						
					}
					
					function debug($obj){
						if(window.console && window.console.log){  
							window.console.log('tabs selection count: ' + $obj.size());  
						}  
					}; 
					
					$.fn.tabs.createTab = function(thisdiv,tab_num,tab_titles){
						var _tabs = '<ul class="nav nav-tabs nav-justified"></ul>';
						
						$(thisdiv).append('<nav></nav>');
						
						$(thisdiv).children('nav').append($(_tabs));
						
						$.each(tab_titles, function (n, value) {  
							 var _li = '<li role="presentation" class="'+ n +'"><a href="#">'+value+'</a></li>';
							 var _section = '<section id = "'+ n +'"></section>';

							 $(thisdiv).find('.nav-tabs').append($(_li));
							 //alert(n + ' ' + value);
							 //alert($(_tabs).html()+$(_section).attr('id'));

							 $(thisdiv).append($(_section));
						  });
						  
						  $.each($(thisdiv).children('.data-container'),function(i){
							  var num = i+1;
							  $('#tab'+num.toString()).html($(this).html());
							  $(this).remove();
						  });
						  return $(thisdiv);
					};

					$.fn.tabs.active = function(tabs,position){
						$('.tab'+position.toString()).addClass('active');
						$(tabs).children('section').hide();
						$('#tab'+position.toString()).show();
					};

					$.fn.tabs.bindEvents = function(tabs){
						$(tabs).children('nav').find('a').bind('click',function(){
							$('.nav-tabs > li').removeClass('active');
							var num = $(this).parent().attr('class').replace('tab','');
							$.fn.tabs.active(tabs,num);
						});
					};
			})(jQuery);  