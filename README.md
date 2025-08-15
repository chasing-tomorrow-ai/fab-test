# FAB Test - Floating Action Button Browser Extension

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/your-org/fab-test)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-orange.svg)](https://developer.chrome.com/docs/extensions/mv3/)

A browser extension for testing and validating the technical feasibility of a Floating Action Button (FAB) system that can be injected into arbitrary web pages. This project serves as a discovery build to explore design patterns, technical constraints, and user experience considerations for future production-grade FAB implementations.

## 🚀 Features

- **Persistent FAB Interface**: Bottom-right corner overlay that stays visible across page interactions
- **Interactive Components**: 4 static buttons, 1 text input, and 1 dynamic state-dependent button
- **State Machine**: Finite state machine controlling dynamic button behavior (Idle → Observing → Ready → Busy → Success/Error → Idle)
- **Context Awareness**: Detects and logs current page URL, origin, and pathname
- **Draggable Interface**: User can reposition FAB with position persistence per origin
- **Style Isolation**: Shadow DOM encapsulation prevents style conflicts with host pages
- **Cross-Site Compatibility**: Works on static HTML, SPAs, and complex web applications

## 📋 Prerequisites

- **Browser**: Chrome 88+ or Edge 88+ (Manifest V3 support required)
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher

## 🛠️ Installation

### For Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/fab-test.git
   cd fab-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   # Development build with auto-injection
   npm run dev:inject
   
   # Development build with manual injection
   npm run dev:min
   ```

4. **Load in Chrome/Edge**
   - Open `chrome://extensions/` or `edge://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### For Testing

1. **Build production version**

   ```bash
   npm run build:inject
   ```

2. **Create distributable package**

   ```bash
   npm run zip
   ```

3. **Install the .zip file**
   - Drag and drop the generated `.zip` file onto your browser's extensions page
   - Or use "Load unpacked" with the extracted contents

## 🔧 Usage

### Basic Operation

1. **Install the extension** following the installation steps above
2. **Navigate to any website** - the FAB will automatically appear in the bottom-right corner
3. **Interact with the FAB**:
   - Click the 4 static buttons to trigger placeholder actions
   - Type in the text input and press Enter to submit
   - Watch the dynamic button change states based on interactions
   - Drag the FAB to reposition it on the page

### FAB Components

- **Static Buttons**: Fixed action buttons with placeholder functionality
- **Text Input**: Single-line input for future command/search features
- **Dynamic Button**: State-dependent button that changes appearance and behavior
- **Drag Handle**: Click and drag to reposition the FAB

### State Machine

The dynamic button cycles through these states:

- **Idle**: Default state, ready for interaction
- **Observing**: Monitoring page activity
- **Ready**: Action available
- **Busy**: Processing or waiting
- **Success/Error**: Operation completed
- **Idle**: Returns to default state

## 🏗️ Development

### Project Structure

```plaintext
fab-test/
├── Docs/                          # Project documentation
│   ├── FAB_Development_Plan.md   # Development roadmap
│   ├── FAB_Product_Vision.md     # Product vision and goals
│   ├── FAB_Technical_Requirements.md # Technical specifications
│   └── FAB_Test_Playbook.md      # Testing guidelines
├── public/                        # Static assets
│   ├── icon16.svg                # Extension icon (16x16)
│   ├── icon48.svg                # Extension icon (48x48)
│   └── icon128.svg               # Extension icon (128x128)
├── scripts/                       # Build and utility scripts
│   └── zip.ts                    # Extension packaging script
├── src/                          # Source code
│   ├── background/               # Background service worker
│   │   └── index.ts             # Background script entry point
│   ├── content/                  # Content scripts
│   │   ├── fab.ts               # FAB UI implementation
│   │   ├── index.ts             # Content script entry point
│   │   ├── stateMachine.ts      # State machine logic
│   │   └── styles.css           # FAB styling
│   ├── options/                  # Extension options page
│   │   ├── index.html           # Options page HTML
│   │   └── main.ts              # Options page logic
│   ├── shared/                   # Shared utilities and types
│   │   ├── storage.ts           # Storage management
│   │   └── types.ts             # TypeScript type definitions
│   └── manifest.ts               # Extension manifest generator
├── tools/                        # Development and testing tools
│   ├── make_testlog.py          # Test log generation script
│   └── templates/                # Template files
│       └── testlog.md.j2        # Test log template
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts               # Vite build configuration
```

### Available Scripts

```bash
# Development
npm run dev:inject    # Auto-inject FAB on all pages
npm run dev:min       # Manual injection mode

# Building
npm run build:inject  # Production build with auto-injection
npm run build:min     # Production build with manual injection

# Utilities
npm run zip           # Create distributable .zip package
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### Build Configuration

The project uses **Vite** with the **@crxjs/vite-plugin** for building Chrome extensions. Two build modes are available:

- **Auto-inject mode**: FAB automatically appears on all pages
- **Manual injection mode**: FAB requires user interaction to appear

### Environment Variables

- `VITE_AUTO_INJECT`: Controls whether the FAB auto-injects (`true`) or requires manual activation (`false`)

## 🧪 Testing

### Test Coverage Requirements

- **Injection Success**: ≥95% success rate across varied websites
- **State Transitions**: All state machine transitions must function correctly
- **Position Persistence**: FAB position must persist per origin
- **Performance**: <50ms injection time, <50ms interaction latency

### Testing Categories

Test the extension on various website types:

- **Web Applications**: Gmail, Asana, Notion
- **News/Media Sites**: CNN, BBC, Medium
- **Single Page Applications**: React, Vue, Angular apps
- **Multifamily SaaS Portals**: Industry-specific platforms

### Test Logging

Use the provided test log template (`tools/templates/testlog.md.j2`) to record:

- Injection success/failure
- Interaction events
- State transitions
- Style conflicts or positioning issues
- Performance observations

## 🔒 Security & Permissions

### Minimal Permissions

The extension requests only essential permissions:

- `"storage"`: For saving FAB positions and settings
- `"activeTab"`: For accessing the current tab's content

### Privacy Considerations

- **No PII Collection**: Only logs URL and basic interaction data
- **Local Storage**: All data stored locally in the browser
- **No Network Calls**: MVP version doesn't make external requests
- **Transparent Logging**: All interactions logged to console for debugging

## 🚧 Known Issues & Limitations

### Technical Constraints

- **CSP Restrictions**: Some sites may block extension injection
- **Z-index Conflicts**: Host site UI may overlay the FAB
- **Browser Compatibility**: Currently optimized for Chrome/Edge
- **Permission Limitations**: Minimal permissions may restrict deeper integrations

### UI Considerations

- **Position Conflicts**: FAB may be obscured by site-specific UI elements
- **Style Isolation**: Shadow DOM provides isolation but may affect some interactions
- **Responsive Design**: FAB positioning optimized for desktop browsers

## 📚 Documentation

- **[FAB Product Vision](Docs/FAB_Product_Vision.md)**: Product goals and scope
- **[Technical Requirements](Docs/FAB_Technical_Requirements.md)**: Detailed technical specifications
- **[Development Plan](Docs/FAB_Development_Plan.md)**: Development roadmap and milestones
- **[Test Playbook](Docs/FAB_Test_Playbook.md)**: Testing guidelines and procedures

## 🤝 Contributing

This is a discovery build for internal testing and validation. For questions or feedback:

1. Review the existing documentation in the `Docs/` folder
2. Test the extension on various websites
3. Document any issues or observations using the test log template
4. Submit feedback through the established channels

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Development

After the testing phase, this project will inform the development of:

- **Production FAB System**: Full-featured FAB for Chasing Tomorrow AI products
- **Site-Specific Adapters**: Context-aware functionality for different websites
- **Command Palette**: Advanced text input with command suggestions
- **Theme Customization**: White-labeling and branding options
- **Telemetry Integration**: Optional usage analytics (with user consent)

## 📞 Support

For technical support or questions about this discovery build:

- **Project Owner**: Steven Rea
- **Phase**: Discovery/Testing (v0.1.0)
- **Purpose**: Technical feasibility validation and design pattern exploration

---

**Note**: This is a test version designed for exploration and validation. It is not intended for production use or public distribution.
