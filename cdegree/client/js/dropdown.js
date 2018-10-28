/* When the user clicks on the button, toggle between hiding and showing the
 dropdown content */
function toggleDropdown() {
  document.getElementById("degree-dropdown").classList.add("show");
}

function filterFunction() {
  let input, filter, dropdown, a, i;
  input = document.getElementById("choose-degree");
  filter = input.value.toUpperCase();
  dropdown = document.getElementById("degree-dropdown");
  a = dropdown.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}