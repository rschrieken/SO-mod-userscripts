// ==UserScript==
// @name         Reduce Clutter
// @description  Revert recent changes that makes the page more cluttered
// @homepage     https://github.com/samliew/SO-mod-userscripts
// @author       @samliew
// @version      1.10.3
//
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*stackapps.com/*
// @include      https://*.stackexchange.com/*
//
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';


    // Show announcement bar if it does not contain these keywords
    const blacklistedAnnouncementWords = [ 'podcast', 'listen', 'tune' ];


        GM_addStyle(`

/*
   Fix comment upvote and flag always showing
   https://meta.stackexchange.com/q/312794
*/
ul.comments-list .comment-voting,
ul.comments-list .comment-flagging {
    visibility: hidden;
}
ul.comments-list .comment:hover .comment-voting,
ul.comments-list .comment:hover .comment-flagging,
ul.comments-list .comment-up-on {
    visibility: visible;
}
.popup-flag-comment {
    visibility: visible !important;
}


/*
   Make comment edited icon same color as timestamp
   https://meta.stackoverflow.com/q/371313
*/
.s-link,
.iconPencilSm {
    color: #9199a1 !important;
}


/*
   Revert change to permanent "edit tags" link
   https://meta.stackoverflow.com/q/374024
*/
.post-taglist #edit-tags {
    opacity: 0.5;
}
.post-layout:hover .post-taglist #edit-tags {
    opacity: 1;
}


/*
   Fix Hot Meta Posts link colour
   https://meta.stackoverflow.com/q/385643
*/
.s-anchors.s-anchors__default.s-anchors__visited a:not(.s-link),
.s-anchors .s-anchors.s-anchors__default.s-anchors__visited a:not(.s-link) {
    color: inherit !important;
}


/*
   Remove Products menu in the top bar
   https://meta.stackoverflow.com/q/386393
*/
.top-bar .-marketing-link {
    display: none !important;
}


/*
   Hide announcements bar before page load,
     then check text for blacklisted words after page load
   https://meta.stackoverflow.com/q/390709
*/
#announcement-banner {
    display: none !important;
}


/* Hide newsletter sidebar ad */
#newsletter-ad {
    display: none !important;
}


/* Hide post reactions */
.votecell [data-controller="reactions"] {
    display: none !important;
}


/* Hide new contributor popover */
.js-new-contributor-popover {
    display: none !important;
}

`);


    document.addEventListener('DOMContentLoaded', function(evt) {

        // If rep notification is displaying low values, remove it
        let repBadge = document.querySelector('.js-achievements-button .indicator-badge');
        if(repBadge) {
            let repCount = Number(repBadge.innerText);
            if(repCount > -5 && repCount < 5) repBadge.parentNode.removeChild(repBadge);
        }

        // Show announcement bar when active and doesn't contain blacklisted keywords
        const annBar = document.getElementById('announcement-banner');
        if(annBar) {
            const annText = annBar.innerText.trim().toLowerCase();
            const isBlacklisted = blacklistedAnnouncementWords && blacklistedAnnouncementWords.some(v => annText.includes(v));
            if(!isBlacklisted) {
                annBar.style.setProperty('display', 'block', 'important');
            }
            else {
                console.log('Announcement bar has been blocked.', annText);
            }
        }
    });


})();
