/* ============================================================
   PREMIUM TEMPLATE — CLIENT CONFIG (Ayan weds Mim)
   ------------------------------------------------------------
   The values the page's script needs live in this one object.
   Display copy (names, invitation text, timeline, venue blurb,
   footer verse) is hand-set in index.html — this template is
   written for one couple rather than rendered from config.
   ============================================================ */

const INVITE_CONFIG = {

  /* ---------- Wedding datetime ----------
     ISO format with timezone. Drives the live countdown and the
     Add-to-Calendar file. 7 PM Dhaka time (UTC+6).              */
  weddingDateTime: "2027-02-14T19:00:00+06:00",

  /* ---------- Add-to-Calendar (.ics) ----------
     Generated locally in the guest's browser when the
     "Add to calendar" button is pressed. Commas in the location
     and description are escaped automatically.                  */
  calendar: {
    title: "Ayan & Mim — Wedding",
    location: "Army Golf Club, Kurmitola, Dhaka, Bangladesh",
    description: "The wedding of Abrar Ibne Karim (Ayan) and Zainab Haque (Mim), at 7 PM.",
    durationHours: 4,                     // ceremony ends around 11 PM
    filename: "ayan-weds-mim.ics",
    prodid: "Ayan weds Mim",
    uid: "am-wedding-20270214@armygolfclub",
  },

  /* ---------- Couple photos ----------
     The <img> tags in index.html carry a data-photo="…" hook and
     no src; the paths below supply it. The current files are
     maroon-and-gold placeholder artwork. For a real client, drop
     photos into assets/photos/ (jpg/webp, portrait ~900×1200 for
     groom/bride, landscape ~1200×750 for couple) and point these
     paths at them — or keep the base names and just change the
     extensions. groom/bride are cropped to a 3:4 frame; the
     couple photo is shown uncropped and doubles as the source of
     assets/og-cover.png (see the README).                       */
  photos: {
    groom: "assets/photos/groom.svg",     // The Couple — groom portrait (3:4 frame)
    bride: "assets/photos/bride.svg",     // The Couple — bride portrait (3:4 frame)
    couple: "assets/photos/couple.svg",   // Moments — couple artwork, shown uncropped
  },

  /* ---------- Background music ----------
     A looping background nasheed ("NAFSIJI" — No Copyright Nasheed /
     Halal Sounds) at assets/music/nafsiji.mp3. Swap the file for the
     client's song when known. It never autoplays silently: the tap
     that opens the invitation, or the floating note button, starts
     it.                                                          */
  music: {
    src: "assets/music/nafsiji.mp3",
    volume: 0.6,
  },

  /* ---------- RSVP ----------
     Replies are remembered in the guest's own browser
     (localStorage) so a returning guest can update their reply.
     whatsapp opens a prefilled reply to the couple's number;
     the guest must press Send in WhatsApp to deliver it.
     Use international format, digits only, no +. Leave "" for
     browser-only replies without WhatsApp delivery.
     maxParty caps the seats stepper; the preview wording covers
     parties up to eight.                                        */
  rsvp: {
    whatsapp: "8801712345678",
    storageKey: "am_rsvp_v1",
    maxParty: 8,
  },
};

/* Export for reuse; safe to ignore in the browser. */
if (typeof module !== "undefined") {
  module.exports = INVITE_CONFIG;
}
