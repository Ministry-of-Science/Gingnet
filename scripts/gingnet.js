/* jshint undef: true, unused: true */
/* global $, Fuse */

$(function () {

  function start(chips) {
    var
      $inputSearch = $("#inputSearch"),
      $result = $("#results"),

      $numberCheckbox = $("#number"),
      $nameCheckbox = $("#name"),
      $rarityCheckbox = $("#rarity"),
      $damageCheckbox = $("#damage"),
      $elementCheckbox = $("#element"),
      $descriptionCheckbox = $("#description"),
      $caseCheckbox = $("#case"),

      searchNumber = false,
      searchName = true,
      searchRarity = false,
      searchDamage = false,
      searchElement = false,
      searchDescription = false,

      isCaseSensitive = false,
      fuse;

    function search() {
      var
        r = fuse.search($inputSearch.val());

      $result.empty();

      $.each(r, function (data) {
        $result.append(
          "<li>" +
          this.number + " | " +
          this.name + " | " +
          this.rarity + " | " +
          this.damage + " | " +
          this.element + " | " +
          this.description +
          "</li>"
        );
      });
    }

    function createFuse() {
      var
        keys = [];

      if (searchNumber) {
        keys.push("number");
      } else if (searchName) {
        keys.push("name");
      } else if (searchRarity) {
        keys.push("rarity");
      } else if (searchDamage) {
        keys.push("damage");
      } else if (searchElement) {
        keys.push("element");
      } else if (searchDescription) {
        keys.push("description");
      }

      fuse = new Fuse(chips, {
        keys: keys,
        caseSensitive: isCaseSensitive
      });
    }

    function onNumberCheckboxChanged() {
      searchNumber = $numberCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onNameCheckboxChanged() {
      searchName = $nameCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onRarityCheckboxChanged() {
      searchRarity = $rarityCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onDamageCheckboxChanged() {
      searchDamage = $damageCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onElementCheckboxChanged() {
      searchElement = $elementCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onDescriptionCheckboxChanged() {
      searchDescription = $descriptionCheckbox.prop("checked");
      createFuse();
      search();
    }

    function onCaseCheckboxChanged() {
      isCaseSensitive = $caseCheckbox.prop("checked");
      createFuse();
      search();
    }

    $numberCheckbox.on("change", onNumberCheckboxChanged);
    $nameCheckbox.on("change", onNameCheckboxChanged);
    $rarityCheckbox.on("change", onRarityCheckboxChanged);
    $damageCheckbox.on("change", onDamageCheckboxChanged);
    $elementCheckbox.on("change", onElementCheckboxChanged);
    $descriptionCheckbox.on("change", onDescriptionCheckboxChanged);

    $caseCheckbox.on("change", onCaseCheckboxChanged);

    $inputSearch.on("keyup", search);
    createFuse();
  }

  var
    allData = [];

  $.getJSON("data/bn1.json", function (data) {
    allData = allData.concat(data);
    start(allData);
  });

  $.getJSON("data/bn2.json", function (data2) {
    allData = allData.concat(data2);
    start(allData);
  });

});