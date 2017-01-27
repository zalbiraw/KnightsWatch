const getFormData = (form) => {
  const data = {}

  for (let field of form.serializeArray()) {
      data[field.name] = field.value
  }

  return data
}

const getURLParam = (name) => {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null){
     return null;
  } else {
     return results[1] || 0;
  }
}

export default { getFormData, getURLParam }
