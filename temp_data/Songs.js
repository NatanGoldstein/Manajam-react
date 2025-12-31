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
        lyrics: [
          {key: '0', text: 'In the jungle'}, 
          {key: '1', text: 'the mighty jungle'}, 
          {key: '2', text: 'the lion sleeps tonight'},
          {key: '3', text: 'Near the village'}, 
          {key: '4', text: 'the peaceful village'}, 
          {key: '5', text: 'the lion sleeps tonight'},
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
              {id: "1", name: "F"}, 
              {id: "2", name: "G"},
              {id: "3", name: "C"},
            ]
          },
          { id: '3', 
            chords: [
              {id: "1", name: "F"}, 
              {id: "2", name: "G"},
            ]
          },
          { id: '4', 
            chords: [
              {id: "1", name: "F"}, 
              {id: "2", name: "G"},
              {id: "3", name: "C"},
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
