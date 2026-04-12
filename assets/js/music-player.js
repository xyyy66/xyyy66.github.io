$(function() {
    var $audio = $('#audio-element')[0];
    var playlist = window.MUSIC_PLAYLIST || [];
    var currentTrackIndex = 0;
    var isPlaying = false;
    var $playlistList = $('#playlist-list');
    var $playlistPanel = $('#playlist-panel');

    // Populate playlist
    if (playlist.length > 0) {
        playlist.forEach(function(song, index) {
            var $li = $('<li></li>').text(song.name);
            $li.on('click', function() {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex, true);
            });
            $playlistList.append($li);
        });
        loadTrack(currentTrackIndex, false);
    }

    function loadTrack(index, autoPlay) {
        $audio.src = playlist[index].url;
        $('#track-name').text(playlist[index].name);
        
        // Highlight active song in playlist
        $playlistList.find('li').removeClass('playing');
        $playlistList.find('li').eq(index).addClass('playing');

        if (autoPlay || isPlaying) {
            var playPromise = $audio.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    isPlaying = true;
                    $('#play-btn').removeClass('fa-play').addClass('fa-pause');
                    $('#audio-wave').addClass('playing');
                }).catch(function(error) {
                    console.log("Autoplay prevented or interrupted", error);
                    isPlaying = false;
                    $('#play-btn').removeClass('fa-pause').addClass('fa-play');
                    $('#audio-wave').removeClass('playing');
                });
            }
        } else {
            $('#play-btn').removeClass('fa-pause').addClass('fa-play');
            $('#audio-wave').removeClass('playing');
        }
    }

    $('#play-btn').on('click', function() {
        if (playlist.length === 0) return;
        if (isPlaying) {
            $audio.pause();
            $(this).removeClass('fa-pause').addClass('fa-play');
            $('#audio-wave').removeClass('playing');
        } else {
            $audio.play();
            $(this).removeClass('fa-play').addClass('fa-pause');
            $('#audio-wave').addClass('playing');
        }
        isPlaying = !isPlaying;
    });

    // Playlist panel toggle
    $('#playlist-btn').on('click', function() {
        $playlistPanel.addClass('open');
    });

    $('#close-playlist-btn').on('click', function() {
        $playlistPanel.removeClass('open');
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
        if (playlist.length === 0) return;
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex, true);
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