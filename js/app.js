
var addRow = function (id) {
  var addHTML = '<tr class="editable">';
  $('tr#' + id).find('input').map(function() {
    var arr = [];
    arr.push($(this).val());
    addHTML += '<td class="editableField">' + $(this).val() + '</td>';
  });
  addHTML += '<td class="editable">' + $('tr.formRow').find('select').val() + '</td>';
  addHTML += '<td class="rowControl"><span class="glyphicon glyphicon-trash glyphicon-fade f_deleteRow"></span><span class="glyphicon glyphicon-pencil glyphicon-fade f_editRow"></span></td>';
  addHTML += '</tr>'
  $('#' + id).before(addHTML);
  $('tr.formRow').hide();
};

$(document).ready(function() {

  // Make table sortable
  // Helper to make table not lose width
  var fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
  };

  // Make tables sortable
  $('tbody').sortable({
    helper: fixHelper
  }).disableSelection();

  // Hide elements
  $('#dormAcctsForm').hide();
  $('#newAcctsForm').hide();

  //Show new form/row
  $('span.f_showFormRow').on('click', function() {
      $(this).siblings('form').find('tr.formRow').toggle();
  });

  $('span.f_addRow').on('click', function() {
    addRow($(this).parents('tr').attr('id'));
  });

  // Change transparency of trash glyph
  $('.glyphicon-fade').hover(function() {
    $(this).css('opacity', 1.0)
  }, function() {
    $(this).css('opacity', 0.1)
  });

  // Delete row
  $('tbody').on('click', '.f_deleteRow', function(e) {
      if (confirm('Are you sure you want to delete?')) {
        $(e.target).closest('tr').remove();
      }
      return false;
  });

  // Make row fields editable
  $('tbody').on('click', '.glyphicon-pencil', function(e) {
      $(e.target).parents('tr.editable').children('.editableField').map(function () {
        var originalText = $(this).text();
        $(this).html('<input type="text" class="form-control" value="' + originalText + '" />');
      });

      $(this).removeClass('glyphicon-pencil').addClass('glyphicon-ok confirm');
  });
  
  // Save changes to row fields
  $('tbody').on('click', '.glyphicon-ok', function(e) {
        $(e.target).parents('tr.editable').children('.editableField').map(function() {
          var newContent = $(this).find('input').val();
          $(this).text(newContent);
        })
        $(this).removeClass('glyphicon-ok confirm').addClass('glyphicon-pencil');
      });
    

});

  

