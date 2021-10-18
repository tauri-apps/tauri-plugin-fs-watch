#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs_watch::Watcher::default())
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
