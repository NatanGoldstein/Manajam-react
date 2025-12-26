export const songs = [
  {
    id: 1,
    bandId: 1,
    name: "Blue Mirage",
    audioUrl:
      'https://github.com/NatanGoldstein/Manajam-react/raw/refs/heads/Screens/BandProfileScreen/assets/songExm.mp3',
    lastUpdate: "2025-11-05",
    blocks: [
      { id: '1', 
        type: 'lyricsChords', 
        header: 'Verse 1',
        lyrics: ['In the jungle', 
              'the mighty jungle', 
              'the lion sleeps tonight',
              'Near the village', 
              'the peaceful village', 
              'the lion sleeps tonight',
        ],
        chords: [
          {id: "1", name: "Am", lineIndex: 0, charIndex: 0},
          {id: "2", name: "Dsus4", lineIndex: 0, charIndex: 1},
          {id: "3", name: "C", lineIndex: 1, charIndex: 0},
          {id: "4", name: "G", lineIndex: 1, charIndex: 4},
          {id: "5", name: "Am", lineIndex: 1, charIndex: 7},
          {id: "6", name: "Em", lineIndex: 2, charIndex: 0},
        ],
      },
      { id: '2', 
        type: 'Chords',
        header: 'Bridge',
        bars: [
          {
            id: '1', 
            chords: [
              {id: "1", name: "F"}, 
              {id: "2", name: "G"},
            ]
          },
          { id: '2', 
            chords: [
              {id: "3", name: "F"}, 
              {id: "4", name: "G"},
              {id: "5", name: "C"},
            ]
          },
          { id: '3', 
            chords: [
              {id: "6", name: "F"}, 
              {id: "7", name: "G"},
            ]
          },
          { id: '4', 
            chords: [
              {id: "8", name: "F"}, 
              {id: "9", name: "G"},
              {id: "10", name: "C"},
            ]
          },
        ],
      },
    ],
    sheets: [],
  },
  {
    id: 2,
    bandId: 1,
    name: "Red Mirage",
    audioUrl:
      'https://github.com/NatanGoldstein/Manajam-react/raw/refs/heads/Screens/BandProfileScreen/assets/songExm.mp3',
    lastUpdate: "2025-11-05",
    lyrics: NaN,
    sheets: [],
  },
  {
    id: 3,
    bandId: 1,
    name: "Blue Mirage",
    audioUrl:
      'https://github.com/NatanGoldstein/Manajam-react/raw/refs/heads/Screens/BandProfileScreen/assets/songExm.mp3',
    lastUpdate: "2025-11-05",
    lyrics: NaN,
    sheets: [],
  },
  {
    id: 4,
    bandId: 2,
    name: "Blue Mirage",
    audioUrl:
      'https://github.com/NatanGoldstein/Manajam-react/raw/refs/heads/Screens/BandProfileScreen/assets/songExm.mp3',
    lastUpdate: "2025-11-05",
    lyrics: NaN,
    sheets: [],
  },
  {
    id: 5,
    bandId: 2,
    name: "Blue Mirage",
    audioUrl:
      'https://github.com/NatanGoldstein/Manajam-react/raw/refs/heads/Screens/BandProfileScreen/assets/songExm.mp3',
    lastUpdate: "2025-11-05",
    lyrics: NaN,
    sheets: [],
  },
];
