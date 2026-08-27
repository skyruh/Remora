#[tauri::command]
async fn connect_vps(profile_id: String) -> Result<String, String> {
  // Mock SSH connection
  println!("Connecting to VPS profile: {}", profile_id);
  Ok(format!("Connected to {}", profile_id))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![connect_vps])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
