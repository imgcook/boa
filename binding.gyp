{
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [
        "src/binding.cc",
        "src/core/node.cc",
        "src/core/module.cc",
        "src/core/object.cc",
        "src/core/error.cc",
        "src/core/function.cc",
        "src/core/reference.cc",
      ],
      "cflags!": [
        "-fno-exceptions",
        "-fno-rtti",
      ],
      "cflags_cc!": [
        "-std=c++11",
        "-stdlib=libc++",
        "-fno-exceptions",
        "-fno-rtti",
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "pybind11/src/include",
        "<!@(node -p \"require('./tools/utils').getPythonHeaderPath()\")",
      ],
      "library_dirs": [
        "<!@(node -p \"require('./tools/utils').getPythonLibraryAbsPath()\")",
      ],
      "libraries": [
        "-lpython<!@(node -p \"require('./tools/utils').getPythonVersion()\")",
        "-Wl,-rpath,'<!@(node -p \"require('./tools/utils').getPythonLibraryRunPath()\")'"
      ],
      "defines": [
        "NAPI_CPP_EXCEPTIONS",
        "BOA_LIBPYTHON_NAME=python<!@(node -p \"require('./tools/utils').getPythonVersion()\")",
        "NAPI_VERSION=6"
      ],
      "conditions": [
        ['OS=="mac"', {
          "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "GCC_ENABLE_CPP_RTTI": "YES",
          },
        }],
      ],
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/<(module_name).node", 
                     "<!@(node -p \"require('./tools/utils').getPythonLibraryAbsPath()\")", 
                     "<!@(node -p \"require('./tools/utils').getPythonBinaryAbsPath()\")" ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}
