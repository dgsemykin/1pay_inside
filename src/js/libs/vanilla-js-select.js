/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 2.1.1
 */

/**
 * @description
 * Vanilla JavaScript dropdown - a tiny (~600 bytes gzipped) select tag replacement.
 *
 * @class
 * @param {(string|Object)} options.elem - HTML id of the select or the DOM element.
 */
var CustomSelect = function(options) {
  var elem          = typeof options.elem === 'string' ?
    document.getElementById(options.elem) : options.elem,
    mainClass     = 'js-Select',
    titleClass    = 'js-Select-title',
    listClass     = 'js-Select-list',
    selectedClass = 'is-selected',
    openClass     = 'is-open',
    selectOptions = elem.querySelectorAll('option'),
    optionsLength = selectOptions.length;

  // creating the pseudo-select container
  var selectContainer = document.createElement('div');

  selectContainer.className = mainClass;

  if (elem.id) {
    selectContainer.id = 'custom-' + elem.id;
  }

  // creating the always visible main button
  var button = document.createElement('button');

  button.className = titleClass;
  button.textContent = selectOptions[0].textContent;

  // creating the UL
  var ul = document.createElement('ul');
  ul.className = listClass;

  for (var i = 0; i < optionsLength; i++) {
    var li = document.createElement('li');

    li.innerText = selectOptions[i].textContent;
    li.setAttribute('data-value', selectOptions[i].value);
    li.setAttribute('data-index', i);

    if (selectOptions[i].getAttribute('selected') !== null) {
      li.classList.add(selectedClass);
      button.textContent = selectOptions[i].textContent;
    }

    ul.appendChild(li);
  }

  // appending the button and the list
  selectContainer.appendChild(button);
  selectContainer.appendChild(ul);

  selectContainer.addEventListener('click', onClick);

  // pseudo-select is ready - append it and hide the original
  elem.parentNode.insertBefore(selectContainer, elem);
  elem.style.display = 'none';


  /**
   * Closes the current select on any click outside of it.
   *
   */
  document.addEventListener('click', function(e) {
    if (!selectContainer.contains(e.target)) close();
  });

  /**
   * Handles the clicks on current select.
   *
   * @param {object} e - The item the click occured on.
   */
  function onClick(e) {
    e.preventDefault();

    var t = e.target; // || e.srcElement; - uncomment for IE8

    if (t.className === titleClass) {
      toggle();
    }

    if (t.tagName === 'LI') {
      selectContainer.querySelector('.' + titleClass).innerText = t.innerText;
      elem.options.selectedIndex = t.getAttribute('data-index');

      //trigger 'change' event
      var evt = new CustomEvent('change');
      elem.dispatchEvent(evt);

      // highlight the selected
      for (var i = 0; i < optionsLength; i++) {
        ul.querySelectorAll('li')[i].classList.remove(selectedClass);
      }
      t.classList.add(selectedClass);

      close();
    }
  }

  /**
   * Toggles the open/close state of the select on title's clicks.
   *
   * @public
   */
  function toggle() {
    selectContainer.classList.toggle(openClass);
  }

  /**
   * Opens the select.
   *
   * @public
   */
  function open() {
    selectContainer.classList.add(openClass);
  }

  /**
   * Closes the select.
   *
   * @public
   */
  function close() {
    selectContainer.classList.remove(openClass);
  }

  return {
    toggle: toggle,
    close:  close,
    open:   open
  };
};