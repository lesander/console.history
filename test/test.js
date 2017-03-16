function outer () {
  inner()
}

function inner () {
  console.warn("Something went wrong, but we're okay!")
}

outer()
