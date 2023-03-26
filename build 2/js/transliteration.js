var source = document.querySelector('._transliteration');
var value;

if (source) {
  source.addEventListener('input', function (e) {
    update(value = e.target.value);
  });

  function update(value) {
    source.value = cyrillicToTranslit({ preset: 'ru' }).transform(value);
  }
}
