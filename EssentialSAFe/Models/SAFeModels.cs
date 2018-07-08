namespace EssentialSAFe.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Collections.Generic;

    public class SAFeModels : DbContext
    {
        // Your context has been configured to use a 'SAFeModels' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'EssentialSAFe.Models.SAFeModels' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'SAFeModels' 
        // connection string in the application configuration file.
        public SAFeModels()
            : base("name=SAFeModels")
        {
        }

        public virtual DbSet<FeatureModel> Features { get; set; }
        public virtual DbSet<StoryModel> Stories { get; set; }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
    }

    public class SAFEModelsInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<SAFeModels>
    {

    }

    public class StoryModel
    {
        public int Id { get; set; }
        public string Story { get; set; }
        public int StoryPoints { get; set; }
    }

    public class FeatureModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Hypothesis { get; set; }
        public string NonFunctional { get; set; }
        public int BusinessValue { get; set; }
        public int Opportunity { get; set; }
        public int Urgency { get; set; }
        public int Size { get; set; }
        public float WSJF { get; set; }
        public ICollection<StoryModel> Stories { get; set; }
        public FeatureModel()
        {
            this.Stories = new List<StoryModel>();
        }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}