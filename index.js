$(function(){
  $('input[type="text"]').on('change',print_val);
  $('input[type="text"]').trigger('change');
  $('button.clear').on('click',clear_inp_all);
  $('button.remove').on('click',remove_inp_row);
  $('button.add').on('click',add_inp_row);
          
          $('button.print').on('click',function(){
            var data = $('form').serializeArray().map(function(e){return e.value});
            var temp = $('div.codes').children().first();
            temp.siblings().remove();
            temp.find('.card-body').empty();
            data.forEach(function(e,i,a){
              if(i>0){
                var clone=temp.clone(true);
                clone.find('.card-body').empty();
                temp.after(clone);
                if((i)%3==0){clone.before($('<div class="w-100">'))}
                temp=clone}
              temp.find('.card-body').append($('<svg id="code-'+i+'" class="img-fluid">'));
              JsBarcode("#code-"+i,e,{
                        background: "#ffffff",
                        width: 4,
                        height: 200,
                        fontSize: 40,
                        textMargin: 4,
                        margin: 4});
              if((i+1)==a.length&&((i+1)%3)!=0){
                for(var j=0; j < (3-((i+1)%3)); j++){
                  var clone=temp.clone(true);
                  clone.find('.card-body').empty();
                  temp.after(clone);
                  temp=clone}}});
            window.print()});
          
          $('input[type="text"]').bind('paste',null,function(e){
            var $txt = $(this);
            setTimeout(function(){
              var values = $txt.val().split(/\s+/);
              console.log(values)
              var current = $txt.parent();
              if(values.length>250){
                $('div.update').append(
                  $('<div class="alert alert-warning alert-dismissible fade show" role="alert">').html(
                    'list greater than 250').append(
                    $('<button type="button" class="close" data-dismiss="alert" aria-label="Close">').html(
                      '<span aria-hidden="true">&times;</span>')));
                $txt.val('');
                return}
              values.forEach(function(e,i){
                if(i==0){$txt.val(e.toUpperCase())}
                else{
                  var clone = current.clone(true);
                  clone.find('input').val(e.toUpperCase());
                  current.after(clone);
                  current=clone}});
            $('input[type="text"]').trigger('change')},0)});
        });
        
function print_val(){
    var data=$('form').serializeArray().map(function(e){return e.value});
    if(data.length==1&&data.toString()==""){$('button.print').hide()}
    else{$('button.print').show()}
    }
    
function clear_inp_all(){
  var input = $('form').children().first();
  input.siblings().remove();
  input.find('input').val('');
  input.find('input').trigger('change');
  }
  
function remove_inp_row(){
  var parent = $(this).parent().parent();
  if(parent.parent().children().length>1){parent.remove()}
  }
  
function add_inp_row(){
  var parent = $(this).parent().parent();
  var clone = parent.clone(true);
  clone.find('input').val('');
  parent.after(clone);
  }
