## bootstrap-plugins

## tabs
  
  * Include file "bootstrap-tabs.js" first .

  * Prepare a father 'div' tag and some children 'div' tag . 
  
  * Each children one as content container of a tab.

  * Then we can activate this plugin, for example

	
<div class="father">
	<div class = "data-container">
		<div style="width:100px;height:100px;background-color:red;"></div>
	</div>
	<div class = "data-container">
		<div style="width:100px;height:100px;background-color:blue;"></div>
	</div>
	<div class = "data-container">
		<div style="width:100px;height:100px;background-color:green;"></div>
	</div>
 </div>

	PS:Class 'father' is tabs's container, class 'data-container' used to fill every tab's content.

	  $('.father').tabs({
			tab_titles:{'tab1':'开始','tab2':'中间','tab3':'结束'},
			active_position:2
		}); 

	PS:Parameter 'tab_titles' to set tab's title.The json key is css class type of tab and the json value is tab's 
	
	title.

	   Parameter 'active_position' to set index of which tab actived when page be initialized.
