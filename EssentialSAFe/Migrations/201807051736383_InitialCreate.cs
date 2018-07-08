namespace EssentialSAFe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FeatureModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Hypothesis = c.String(),
                        NonFunctional = c.String(),
                        BusinessValue = c.Int(nullable: false),
                        Opportunity = c.Int(nullable: false),
                        Urgency = c.Int(nullable: false),
                        Size = c.Int(nullable: false),
                        WSJF = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.FeatureModels");
        }
    }
}
