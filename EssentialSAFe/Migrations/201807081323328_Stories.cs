namespace EssentialSAFe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Stories : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StoryModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Story = c.String(),
                        StoryPoints = c.Int(nullable: false),
                        FeatureModel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FeatureModels", t => t.FeatureModel_Id)
                .Index(t => t.FeatureModel_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StoryModels", "FeatureModel_Id", "dbo.FeatureModels");
            DropIndex("dbo.StoryModels", new[] { "FeatureModel_Id" });
            DropTable("dbo.StoryModels");
        }
    }
}
