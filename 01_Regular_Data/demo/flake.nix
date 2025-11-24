{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  outputs = { self, nixpkgs }: {
    devShells.x86_64-linux.default =
      with nixpkgs.legacyPackages.x86_64-linux;
      mkShell {
        buildInputs = [
          (python3.withPackages (ps: [ ps.torch ]))
          htop
          zsh
        ];
        shellHook = ''
          exec zsh
        '';
      };
  };
}
