
var bindPrefrenceSelectors = function() {
  var previousIndex;
  var optionIndex;
  $('select#preferences_mental_health').on('focus', function() {
    previousIndex = $('select#preferences_mental_health option:selected').index();
  }).change(function() {
    optionIndex = $('select#preferences_mental_health option:selected').index();
    if (optionIndex != 0) {
      $('select#preferences_gender option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_ethnicity option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_academic_focus option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_religion option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
>>>>>>> made it so different preferences cannot have the same ranking
    }
    $('select#preferences_gender option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_ethnicity option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_academic_focus option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_religion option:eq(' + previousIndex + ')').removeAttr('disabled');
  });

  $('select#preferences_gender').on('focus', function() {
    previousIndex = $('select#preferences_gender option:selected').index();
  }).change(function() {
    optionIndex = $('select#preferences_gender option:selected').index();
    if (optionIndex != 0) {
      $('select#preferences_mental_health option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_ethnicity option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_academic_focus option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_religion option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
    }
    $('select#preferences_mental_health option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_ethnicity option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_academic_focus option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_religion option:eq(' + previousIndex + ')').removeAttr('disabled');
  });

  $('select#preferences_ethnicity').on('focus', function() {
    previousIndex = $('select#preferences_ethnicity option:selected').index();
  }).change(function() {
    optionIndex = $('select#preferences_ethnicity option:selected').index();
    if (optionIndex != 0) {
      $('select#preferences_gender option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_mental_health option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_academic_focus option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_religion option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
    }
    $('select#preferences_gender option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_mental_health option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_academic_focus option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_religion option:eq(' + previousIndex + ')').removeAttr('disabled');
  });

  $('select#preferences_academic_focus').on('focus', function() {
    previousIndex = $('select#preferences_academic_focus option:selected').index();
  }).change(function() {
    optionIndex = $('select#preferences_academic_focus option:selected').index();
    if (optionIndex != 0) {
      $('select#preferences_gender option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_ethnicity option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_mental_health option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_religion option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
    }
    $('select#preferences_gender option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_ethnicity option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_mental_health option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_religion option:eq(' + previousIndex + ')').removeAttr('disabled');
  });

  $('select#preferences_religion').on('focus', function() {
    previousIndex = $('select#preferences_religion option:selected').index();
  }).change(function() {
    optionIndex = $('select#preferences_religion option:selected').index();
    if (optionIndex != 0) {
      $('select#preferences_gender option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_ethnicity option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_academic_focus option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
      $('select#preferences_mental_health option:eq(' + optionIndex + ')').attr('disabled', 'disabled');
    }
    $('select#preferences_gender option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_ethnicity option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_academic_focus option:eq(' + previousIndex + ')').removeAttr('disabled');
    $('select#preferences_mental_health option:eq(' + previousIndex + ')').removeAttr('disabled');
  });
}

var bindOnlineToggle = function() {
  $('#toggle-online-profiles').click(function() {
    $('input#q_online_or_all_profiles').prop('checked', !$('input#q_online_or_all_profiles').is(':checked'));
    $('input[name=commit').click();
  });
}

var bindRecommendSort = function() {
  $('#recommend-sort').click(function() {
    $('select#q_s_0_name>option:eq(3)').prop('selected', true);
    $('select#q_s_0_dir>option:eq(2)').prop('selected', true);
    $('input[name=commit').click()
  });
}

var bindSort = function(sortId, checkPos) {
  $(sortId).click(function() {
    var selectId = 'select#q_s_0_name>option:eq(' + checkPos + ')'
    $(selectId).prop('selected', true);
    $('input[name=commit').click()
  });
}

var updateSearchContent = function(searchFormContent, searchResultsContent) {
  $('.search-field').remove();
  $('.filters-container').append(searchFormContent);

  $('.pagination').remove()
  $('.results-container').remove();
  $('.profile-results-container').append(searchResultsContent);
}

var bindAgeSlider = function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 16,
    max: 60,
    values: [ $('input#q_age_gteq').val(), $('input#q_age_lteq').val() ],
    slide: function(event, ui) {
      $( "#age-range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    },
    change: function(event, ui) {
      $('input#q_age_gteq').val(ui.values[0])
      $('input#q_age_lteq').val(ui.values[1])
    }
  });
  $( "#age-range" ).val( $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );
}

var disableSort = function(sortId) {
  $(sortId).parent().addClass("disabled")
}


$(function() {
  //initialize scrollbars
  $('.custom-scroll').mCustomScrollbar({
      theme: "minimal-dark"
  });

  // initialize dropdown preference tooltips
  $('.dropdown-pref').tooltip({
      container: 'body',
      html: true,
      trigger: 'hover',
      template: '<div class="tooltip dropdown-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: 'If you want to see this category higher in the results, select 1 to 4, 1 being the highest. Leave at 0 if you have no preference. ',
      placement: 'right'
  });

  // default functionality
  defaultSearch();
  $('#default-search').click(function() {
    defaultSearch();
  });

  function defaultSearch() {
    $.get("/profiles/default_search", { }, function (data) {
      var char_ids = data.char_ids;
      for (var i = 0; i < char_ids.length; i++) {
        $('input#q_characteristics_id_in_any_' + char_ids[i]).prop('checked', true);
      }
    });
  }

  $( "#slider-range" ).slider({
    range: true,
    min: 16,
    max: 60,
    values: [ 16, 60 ],
    slide: function(event, ui) {
      $( "#age-range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    },
    change: function(event, ui) {
      $('input#q_age_gteq').val(ui.values[0])
      $('input#q_age_lteq').val(ui.values[1])
    }
  });
  $( "#age-range" ).val( $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );
  $('input#q_age_gteq').val(16)
  $('input#q_age_lteq').val(60)

  bindOnlineToggle();
  
  bindRecommendSort();
  bindSort('#age-sort', '1');
  bindSort('#name-sort', '2');
  
  bindPrefrenceSelectors();
});
