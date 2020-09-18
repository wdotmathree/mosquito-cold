var form = $("#authenticator");

function event(element, func) {
  $("#" + element).click(func);
}

event("reset", reset);
event("crash", crash);
event("clear", clear);
event("logs", logs);

function reset() {
  location.replace("/restart");
}

function crash() {}

function clear() {
  form.attr("action", "/clear");
  form.submit();
}

function logs() {
  form.attr("action", "/logs");
  form.submit();
}
