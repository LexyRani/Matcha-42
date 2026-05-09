

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p className="font-bodoni text-lg font-bold text-gray-800">Matcha</p>
        <p className="text-xs text-gray-500 font-sans">
          © 2026 - Made with ❤️ by aceralin and nchow-yu at 42 Paris
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
          <span className="hover:text-gray-600 cursor-pointer transition-colors">Mentions Légales</span>
          <span>•</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">Confidentialité</span>
        </div>
      </div>
    </footer>
  );
}
