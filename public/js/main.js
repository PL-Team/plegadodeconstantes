$(document).ready(function() {
  $('#parse').click(function() {
    try {
      var myCodeMirror = $(".CodeMirror")[0].CodeMirror
      var source = myCodeMirror.getValue()

      out.className = "unhidden";
      
      // Import: Change: $('#input').val() -> source, i forget it, again 
      var tree = calculator.parse(source);
      plegadoConstantes(tree);
      $('#output').html(JSON.stringify(tree,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      var myCodeMirror = $('.CodeMirror')[0].CodeMirror;
      myCodeMirror.setValue(contents);
    }
    r.readAsText(f);
  });

});
function plegadoConstantes(tree){
	switch (tree.type){
		case "BLOCK":
		case "procedure":			
			if(tree.hasOwnProperty("procs")){
				plegadoConstantes(tree.procs);
			}
			if(tree.hasOwnProperty("stat")){
				for (var i in tree.stat.statement_list){
					tree.stat.statement_list[i] = plegadoConstantes(tree.stat.statement_list[i]);
				}
			}
			break;
		case "=":
			var num = {
				type:"Number",
				value:tree.value
			}
			var treeN = {
				type: "=",
				left: tree.right,
				right: num
			}
			tree.left = treeN;
			return treeN
			break;
		case "CALL":
			break;
		case "BEGIN":
			break;
		case "IF":
			break;
		case "IFELSE":
			break;
		case "ODD":
			break;
		case "==":
		case "!=":
		case "<=":
		case "<":
		case ">":
		case ">=":
		case "-":
		case "+":
		case "*":
		case "/":
		
		break;
		case "NUMBER":
			break;
		case "ID":
			break;
	}
}

  

