$(function() {
    var $audio = $('#audio-element')[0];
    var playlist = [];
    var currentTrackIndex = 0;
    var isPlaying = false;

    $.getJSON('assets/music/playlist.json', function(data) {
        playlist = data;
        if (playlist.length > 0) {
            loadTrack(currentTrackIndex);
        }
    });

    function loadTrack(index) {
        $audio.src = playlist[index].url;
        $('#track-name').text(playlist[index].name);
        if (isPlaying) {
            var playPromise = $audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log("Autoplay prevented or interrupted", error);
                });
            }
        }
    }

    $('#play-btn').on('click', function() {
        if (isPlaying) {
            $audio.pause();
            $(this).removeClass('fa-pause').addClass('fa-play');
        } else {
            $audio.play();
            $(this).removeClass('fa-play').addClass('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    $('#next-btn').on('click', function() {
        if (playlist.length === 0) return;
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
    });

    $('#prev-btn').on('click', function() {
        if (playlist.length === 0) return;
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
    });

    $($audio).on('timeupdate', function() {
        if (!isNaN($audio.duration) && $audio.duration > 0) {
            var progressPercent = ($audio.currentTime / $audio.duration) * 100;
            $('#progress-bar').css('width', progressPercent + '%');
            $('#current-time').text(formatTime($audio.currentTime));
        }
    });

    $($audio).on('loadedmetadata', function() {
        $('#duration').text(formatTime($audio.duration));
        $('#progress-bar').css('width', '0%');
    });

    $($audio).on('ended', function() {
        $('#next-btn').click();
    });

    $('#progress-container').on('click', function(e) {
        if (isNaN($audio.duration)) return;
        var width = $(this).width();
        var clickX = e.offsetX;
        var duration = $audio.duration;
        $audio.currentTime = (clickX / width) * duration;
    });

    $('#volume-slider').on('input', function() {
        $audio.volume = $(this).val();
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        var min = Math.floor(seconds / 60);
        var sec = Math.floor(seconds % 60);
        return min + ":" + (sec < 10 ? "0" + sec : sec);
    }
});