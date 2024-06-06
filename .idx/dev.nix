{ pkgs, ... }: {
  
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
  ];

  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "bun"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}