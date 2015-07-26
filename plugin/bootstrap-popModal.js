(function($) {  
				$.fn.popModal = function(options) { 
						debug(this);  
						$this = $(this);
						var defaults = {
							/* model's id */
							modal:'',
							/* alert type , select from warning,info,success,error */
							type:'type',
							/* model's title */
							title:'popModel',
							/* model's content */
							content:'content',

							closeOther:true,

							buttons:{'确认':function(){alert('确认1')},'取消':function(){alert('取消1')}}

						};

						var options = $.extend(defaults, options);  
						
						return this.each(function() { 

							$('#'+options.modal).find('.title').text(options.title);
							$('#'+options.modal).find('.content').text(options.content);
							if('none'==options.buttons){
								$('#'+options.modal).find('.modal-footer').hide();
							}else{
								$.fn.popModal.bindButton(options.buttons,options.modal);
								$('#'+options.modal).find('.modal-footer').show();
							}

							$.fn.popModal.setAlertType(options.type,options.modal);
					
							$.fn.popModal.bindEvents($(this),options.modal,options.closeOther,$.fn.popModal.showModal);
						});
						
					}
					
					function debug($obj){
						if(window.console && window.console.log){  
							window.console.log('tabs selection count: ' + $obj.size());  
						}  
					}; 

					$.fn.popModal.setAlertType = function(type,modal){
						$('#'+modal).find('.alert').removeClass('alert-warning').removeClass('alert-info').removeClass('alert-error').addClass('alert-'+type);
					};

					$.fn.popModal.bindButton = function(buttons,modal){
						$.each(buttons,function(n,value){
							var button = $('<button class="btn" data-dismiss="modal" aria-hidden="true">'+n+'</button>');
							$(button).on('click',function(e){$(value);e.stopPropagation();});
							$('#'+modal).find('.modal-footer').append(button);
						});
					}

					$.fn.popModal.showModal = function(modal,closeFlag){
						if(closeFlag){
							$('.modal').each(function(){
								if($(this).attr('id')!= modal){
									$(this).modal('hide');
								}
							});
						}
						$('#'+modal).modal('show');
					}

					$.fn.popModal.bindEvents = function(target,modal,closeFlag,callback){
						$(target).bind('click',function(){callback(modal,closeFlag);});
					}
				
			})(jQuery);  