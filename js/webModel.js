$('.page2').find('.item-plus').click(function(){
			var uuid = 'U'+ Math.random()*10e16;

			var item = "<tr class='form-edit'><td><button type='button' class='btn btn-danger  item-del'><i class='icon-remove icon-white'></i></button></td><td class='input-container'><input type='text' placeholder='input name' class = 'attrname'><h6 style='display: none;'></h6></td><td class='input-container'><select class='span3'><option>text</option><option>select</option><option>checkbox</option><option>hidden</option></select><h6 style='display: none;'></h6></td><td class='input-container'><input type='text' placeholder='input default'><h6 style='display: none;'></h6></td><td class='input-container'><input type='text' placeholder='input key'><h6 style='display: none;'></h6><input type='hidden' value='"+uuid+"'></td><td><button type='button' class='btn btn-success item-ok'><i class='icon-eye-open icon-white'></i></button></td></tr>";
			
			$(this).closest('thead').next().append($(item));
		});

		$('.page4').find('.item-plus').live('click',function(){
			createTable('page4');
		});

		$('.page5').find('.item-plus').live('click',function(){
			createTable('page5');
		});

		$('.page2').find('.item-del').live('click',function(){
			$(this).parents('tr').remove();
		});

		$('.page4').find('.item-del').live('click',function(){
			$(this).parents('tr').remove();
		});

		$('.page5').find('.item-del').live('click',function(){
			$(this).parents('tr').remove();
		});

		$('.page2').find('.item-ok').live('click',function(){
			//alert($(this).parents('tr').html());
			$.each($(this).parents('tr').children('td:has(input[type="text"])'),function(){
				var val = $(this).children('input').val();
				$(this).children('input').hide();
				$(this).children('h6').html(val).show();
			});
			$.each($(this).parents('tr').children('td:has(select)'),function(){
				var val = $(this).children('select').val();
				$(this).children('select').hide();
				$(this).children('h6').html(val).show();
			});
			//var ckbxtr = $(this).parents('tr').children('td:has(input[type="checkbox"])');
			//var ckbx = ckbxtr.children('input[type="checkbox"]');
			//$(ckbx).hide();
			//if(ckbx.prop('checked')){
			//	$(ckbxtr).append('<i class="icon-ok"></i>');
			//}
			$(this).children('i').removeClass('icon-eye-open').addClass('icon-edit');
			$(this).removeClass('btn-success').addClass('btn-inverse').addClass('item-edit').removeClass('item-ok');
			//$(this).parents('tr').removeClass('form-edit');
		});

		$('.page2').find('.item-edit').live('click',function(){
			$.each($(this).parents('tr').children('td:has(input[type="text"])'),function(){
				//var val = $(this).children('input').val();
				$(this).children('h6').hide();
				$(this).children('input').show();
			});
			$.each($(this).parents('tr').children('td:has(select)'),function(){
				//var val = $(this).children('select').val();
				$(this).children('h6').hide();
				$(this).children('select').show();
			});
			//$(this).parents('tr').children('td:has(input[type="checkbox"])').children('.icon-ok').remove();
			//$(this).parents('tr').children('td:has(input[type="checkbox"])').children('input[type="checkbox"]').show();
			$(this).children('i').removeClass('icon-edit').addClass('icon-eye-open');
			$(this).removeClass('btn-inverse').addClass('btn-success').addClass('item-ok').removeClass('item-edit');
			
		});

		var usePage3 = false;
		var selectBlock = $('.page3').find('tbody').clone();
		$('.next-step').click(function(){
			if($(this).closest('section').find('input').size()>0){
				var isNotEmpty = true;
				$(this).closest('section').find('input').each(function(){
					if($(this).val()==''){
						$(this).focus();
						isNotEmpty = false;
						return false;
					}
				});
				if(!isNotEmpty)
					return;
			}
			
			if($(this).closest('section').hasClass('page2')){
				$('.page2>table>tbody').children('tr').each(function(){
					$(this).children('td').each(function(){
						$(this).children('h6').text($(this).children('input[type=text]').val());
						$(this).children('h6').text($(this).children('select').val());
					});
				});

				var selectSize = 0;
				var selects = new Array();
				$(this).closest('section').find('select').each(function(){
					if($(this).val()=='select'){
						selectSize++;
						selects[selectSize] = $(this).closest('td').prev().children('input[type="text"]').val();
					}
				});
				
				if(selectSize == 0){
					usePage3 = false;
					$(this).closest('section').slideUp();
					createTable('page4');
					$('.page4').slideDown();
					return;
				}else if(selectSize > 0){
					usePage3 = true;
					$(this).closest('section').next().find('tbody').remove();
					for(var i = 0; i < selects.length-1;i++){
						var sltCtnr = selectBlock.eq(0).clone();
						$(sltCtnr).find('.select-attr > h4').text(selects[i+1]);
						$(sltCtnr).find('.resize-full').text(selects[i+1]+'展开');
						$('.page3').find('table').append(sltCtnr);
						//sltCtnr.find('select-attr').text(selects[i+1]);
					}
				}
			}

			if($(this).closest('section').hasClass('page3')){
				createTable('page4');
			}

			if($(this).closest('section').hasClass('page4')){
				createTable('page5');
			}
			
			$(this).closest('section').slideUp();
			$(this).closest('section').next().slideDown();
		});

		$('.prev-step').click(function(){
			if($(this).closest('section').hasClass('page4')){
				if(!usePage3){
					$(this).closest('section').slideUp();
					$('.page2').slideDown();
					return;
				}
			}
			if($(this).closest('section').hasClass('page3')){
				$(this).closest('section').find('tbody').remove();
			}
			$(this).closest('section').slideUp();
			$(this).closest('section').prev().slideDown();
		});

		$('.page3').find('tbody').live('mouseenter',function(){
			$(this).find('.btn-list').slideDown();
		});

		$('.page3').find('tbody').live('mouseleave',function(){
			$(this).find('.btn-list').slideUp();
		});

		$('.resize-small').live('click',function(){
			$(this).closest('tbody').children('.form-edit').hide();
			$(this).closest('tbody').children('.resize-full-tr').show();
		});

		$('.resize-full').live('click',function(){
			$(this).closest('tbody').children('.resize-full-tr').hide();
			$(this).closest('tbody').children('.form-edit').show();
		});

		$('.page3').find('.item-plus').live('click',function(){
			var item = "<tr class='form-edit'><td class='btn-remove'><button type='button' class='btn btn-danger item-remove'><i class='icon-remove icon-white'></i></button></td><td><input type='text' placeholder='输入选项名'></td><td><input type='text' placeholder='输入选项值'></td></tr>";
			var firstTd = $(this).closest('tbody').find('.select-attr');
			var rspan = $(this).closest('tbody').find('.select-attr').attr('rowspan');
			$(firstTd).attr('rowspan',parseInt(rspan)+1);
			$(this).closest('tbody').children('.form-edit').last().after(item);
		});

		$('.page3').find('.item-remove').live('click',function(){
			if($(this).hasClass('disabled')){
				return;
			}
			var firstTd = $(this).closest('tbody').find('.select-attr');
			var rspan = $(this).closest('tbody').find('.select-attr').attr('rowspan');
			$(firstTd).attr('rowspan',parseInt(rspan)-1);
			
			$(this).closest('tr').remove();
		});

		var createTable = function(curpage){
			var thead = $('.page2>table>thead').clone();
			var tbody = $('.page2>table>tbody').clone();

			thead.children('tr').each(function(){
				$(this).children('th').first().find('i').removeClass('icon-plus').addClass('icon-refresh');
				$(this).children('th').last().remove();
			});
			tbody.children('tr').each(function(){
				$(this).children('td').each(function(){
					$(this).children('h6').text($(this).children('input[type=text]').val());
					$(this).children('input[type=text]').remove();
					$(this).children('select').next().text(function(){
						if('page4'==curpage){
							return 'text';
						}else{
							return;
						}
					});
					$(this).children('select').remove();
					$(this).children('h6').show();
				});
				$(this).children('td').last().remove();
			});
			
			$('.'+curpage+'>table>thead').replaceWith(thead);
			$('.'+curpage+'>table>tbody').replaceWith(tbody);
		};