import { Icon } from "../../theme/daisyui";

// prettier-ignore
export default function IconTest() {
  const onClick = (iconName: string) => alert(`${iconName} icon clicked! 🎉`)
  
  return (
    <section className="mt-4">
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
        <h3 className="font-bold text-xl text-center mb-6 text-accent">🎯 Icon Buttons</h3>
        
        {/* Featured Icon Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center space-y-2">
            <Icon 
              className="btn-primary btn-lg hover:scale-110 transition-all shadow-lg" 
              iconClassName="text-4xl" 
              name="settings" 
              onClick={() => onClick('Settings')} 
            />
            <p className="text-sm font-medium">Settings</p>
          </div>
          <div className="text-center space-y-2">
            <Icon 
              className="btn-secondary btn-lg hover:scale-110 transition-all shadow-lg" 
              iconClassName="text-4xl" 
              name="done" 
              onClick={() => onClick('Done')} 
            />
            <p className="text-sm font-medium">Complete</p>
          </div>
          <div className="text-center space-y-2">
            <Icon 
              className="btn-accent btn-lg hover:scale-110 transition-all shadow-lg" 
              iconClassName="text-4xl" 
              name="menu" 
              onClick={() => onClick('Menu')} 
            />
            <p className="text-sm font-medium">Menu</p>
          </div>
          <div className="text-center space-y-2">
            <Icon 
              className="btn-info btn-lg hover:scale-110 transition-all shadow-lg" 
              iconClassName="text-4xl" 
              name="file_upload" 
              onClick={() => onClick('Upload')} 
            />
            <p className="text-sm font-medium">Upload</p>
          </div>
        </div>

        {/* Size Variations */}
        <div className="divider divider-accent">Size Variations</div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Icon className="btn-success btn-lg hover:scale-110 transition-all" iconClassName="text-3xl" name="favorite" onClick={() => onClick('Favorite')} />
          <Icon className="btn-warning btn-md hover:scale-110 transition-all" iconClassName="text-2xl" name="star" onClick={() => onClick('Star')} />
          <Icon className="btn-error btn-sm hover:scale-110 transition-all" iconClassName="text-xl" name="delete" onClick={() => onClick('Delete')} />
          <Icon className="btn-ghost btn-xs hover:scale-110 transition-all" name="help" onClick={() => onClick('Help')} />
        </div>

        {/* Outline & Ghost Variants */}
        <div className="divider divider-accent">Style Variants</div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <Icon className="btn-outline btn-primary hover:scale-110 transition-all" name="home" onClick={() => onClick('Home')} />
          <Icon className="btn-outline btn-secondary hover:scale-110 transition-all" name="search" onClick={() => onClick('Search')} />
          <Icon className="btn-outline btn-accent hover:scale-110 transition-all" name="notifications" onClick={() => onClick('Notifications')} />
          <Icon className="btn-ghost btn-primary hover:scale-110 transition-all" name="account_circle" onClick={() => onClick('Profile')} />
          <Icon className="btn-ghost btn-secondary hover:scale-110 transition-all" name="shopping_cart" onClick={() => onClick('Cart')} />
          <Icon className="btn-ghost btn-accent hover:scale-110 transition-all" name="bookmark" onClick={() => onClick('Bookmark')} />
        </div>
      </div>
    </section>
  )
}
