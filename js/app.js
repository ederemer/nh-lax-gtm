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
  $('#formRow').hide();
  $('.rowControl').hide();

  //Show new Opportunity form/row
  $('#newItem').on('click', function() {
    $('#formRow').toggle();
  });

  // Add new opporuntity row
  $('#addOpp').on('click', function() {
    // Grab form values and create HTML
    var accountText = $('#account').val();
    var bdLeadsText = $('#bdLeads').val();
    var lastContact = $('#lastContact').val();
    var oppNameText = $('#opportunity').val();
    var statusText = $('#status').val();
    var newOppHTML = '<tr class="editable"><td class="editableField">' + accountText + '</td><td class="editableField">' + bdLeadsText + '</td><td class="editableField">' + lastContact + '</td><td class="editableField">' + oppNameText + '</td><td class="editableField"><span class="label label-default">' + statusText + '</span></td><td class="rowControl"><span class="glyphicon glyphicon-trash glyphicon-fade f_deleteRow"></span><span class="glyphicon glyphicon-pencil glyphicon-fade f_editRow"></span></td></tr>';

    //Add new table row to table before the
    $('#formRow').before(newOppHTML);

    //Clear and hide form
    $('#account').val('');
    $('#bdLeads').val('');
    $('#lastContact').val('');
    $('#opportunity').val('');
    $('#status').val('');
    $('#formRow').hide();
  });

  // Show and hide the row control table column
  $('tr').hover(function() {
    $(this).find('td.rowControl').stop(true, true).delay(200).show(0);
    }, function() {
    $(this).find('td.rowControl').stop(true, true).delay(1000).hide(0);
  });

  // Change transparency of trash glyph
  $('.glyphicon-fade').hover(function() {
    $(this).css('opacity', 1.0)
  }, function() {
    $(this).css('opacity', 0.5)
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
  

