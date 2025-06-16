$(document).ready(function () {
  $('.pengajuan-item').on('click', function (e) {
    e.preventDefault();

    const page = $(this).data('page');
    $('#pengajuan-list').addClass('d-none');
    $('#pengajuan-content').removeClass('d-none').html('<p class="text-muted">Memuat...</p>');
    $('#pengajuan-content').load(`/resource/views/content/user/content/pengajuan/${page}.html`, function () {
      const script = document.createElement('script');
      script.src = `/resource/js/content/user/script/pengajuan/${page}.js`;
      document.body.appendChild(script);
    });
  });

  $(document).on('click', '#backToList', function () {
    $('#pengajuan-content').addClass('d-none').empty();
    $('#pengajuan-list').removeClass('d-none');
  });
});
